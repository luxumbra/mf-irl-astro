import { v4 as uuid } from 'uuid';
import { generatePaymentUrl } from '~/utils/utils';
import { animate, AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import type { CryptoItemType, PaymentUrlOptions } from '~/utils/utils';
import { currencySymbol, paycekProfileCode, paycekSecret, uri } from '~/config.mjs';
import './tier.css';
import { useEffect, useState } from 'react';
import { Modal } from 'flowbite-react';
import { Icon }	from '@iconify/react';


export interface TicketMethodProps {
	title: string;
	price: {
		standard?: number | string | null;
		patron?: number | string | null;
		sponsor?: number | string | null;
		crew?: number | string | null;
		metagamer?: number | string | null;
	};
	discount: number | null;
	summary: string;
	method: string;
	ctaText: string;
}

export type TicketMethodType = {
	title: string;
	price: {
		standard?: number | string | null;
		patron?: number | string | null;
		sponsor?: number | string | null;
		crew?: number | string | null;
		metagamer?: number | string | null;
	};
	discount: number | null;
	summary: string;
	method: string;
	ctaText: string;
};

export interface BuyButtonProps {
	text: string;
	prices?: TicketMethodType['price'];
}

export interface PayloadOptions {
	total: string;
	items: CryptoItemType[];
}

export const FiatButton = ({ text }: BuyButtonProps): JSX.Element => {
	return (
		<button
			data-buy-method="fiat"
			className="btn btn-ghost bg-gradient-tertiary  text-secondary focus:outline-dashed focus:outline-primary w-auto"
			data-tally-open="mRx81K"
			data-tally-layout="modal"
			data-tally-width="800"
			data-tally-align-left="1"
			data-tally-emoji-text="👋"
			data-tally-emoji-animation="wave"
			data-tally-auto-close="10000"
		>
			{text}
		</button>
	);
};

export const CryptoModalButton = ({ text, prices }: BuyButtonProps): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [quantityB, setQuantityB] = useState(1);
	const [basket, setBasket] = useState<CryptoItemType[]>([]);
	const [basketTotal, setBasketTotal] = useState(0);

	const toggleModal = () => {
		if (typeof window !== 'undefined') {
			const body = document.querySelector('body');
			if (body) {
				body.classList.toggle('overflow-hidden');
			}
		}
		setIsOpen(!isOpen);
	};

	const handlePurchase = (basketData: CryptoItemType[]) => {
		const payload = (
			total: PayloadOptions['total'],
			items: PayloadOptions['items'],
		) => {

			return {
				profileID: paycekProfileCode,
				secretKey: paycekSecret,
				paymentID: uuid(),
				totalAmount: total,
				items: items,
				email: null,
				successUrl: `${uri}/tickets/success`,
				failUrl: `${uri}/tickets/failed`,
				backUrl: `${uri}/tickets`,
				statusUrlCallback: '',
				description: '',
				language: 'en',
			} as PaymentUrlOptions;
		};

		// get the total amount of the basket
		const total = basketData.reduce((acc, item) => {
			return acc + parseFloat(item.amount);
		}, 0);

		const data = payload(total.toFixed(2), basketData);

		const url = generatePaymentUrl(data);

		window.location.replace(url);
	};

	/**
	 * delete an item from the basket and subtract the quantity and total from the basket total
	 */
	const removeFromBasket = (name: string) => {
		const updatedBasket = basket.filter((item) => item.name !== name);
		const total = updatedBasket.reduce((acc, item) => {
			return acc + parseFloat(item.amount);
		}, 0);
		setBasketTotal(total);

		setBasket(updatedBasket);
	};

	/**
	 * add an item to the basket
	 * @param tier - the tier of the item to be added to the basket
	 * @param quantity - TODO: the quantity of the item to be added to the basket
	 */
	const addToBasket = (tier: string) => {
		const amountInput = document.querySelector('input[name="amount"]');
		const amount = amountInput.getAttribute('value');
		const nameInput = document.querySelector('input[name="name"]');
		const name = nameInput.getAttribute('value');
		const patronAmountInput = document.querySelector('input[name="patronAmount"]');
		const patronAmount = patronAmountInput.getAttribute('value');
		const patronNameInput = document.querySelector('input[name="patronName"]');
		const patronName = patronNameInput.getAttribute('value');

		/**
		 *  if an item of the same type is already in the basket, update the quantity and total instead of adding a new item, if not, add a new item to the basket and update the basket total
		*/
		const itemExists = basket.find((item) => item.name === name);
		const patronItemExists = basket.find((item) => item.name === patronName);

		if (tier === 'standard') {
			if (itemExists) {
				const updatedItem = {
					...itemExists,
					units: itemExists.units + quantity,
					amount: (parseFloat(amount) * (itemExists.units + quantity)).toFixed(2),
				};
				const updatedBasket = basket.map((item) => {
					if (item.name === name) {
						return updatedItem;
					}
					return item;
				});
				setBasket(updatedBasket);
				setBasketTotal(basketTotal + parseFloat(amount) * quantity);
			} else {
				const total = (parseFloat(amount) * quantity).toFixed(2);
				const standardItem = { name, units: quantity, amount: total };
				setBasket([...basket, standardItem]);
				setBasketTotal(+(basketTotal + parseFloat(amount) * quantity).toFixed(2));
			}
		}

		if (tier === 'patron') {
			if (patronItemExists) {
				const updatedItem = {
					...patronItemExists,
					units: patronItemExists.units + quantityB,
					amount: (parseFloat(patronAmount) * (patronItemExists.units + quantityB)).toFixed(2),
				};
				const updatedBasket = basket.map((item) => {
					if (item.name === patronName) {
						return updatedItem;
					}
					return item;
				});
				setBasket(updatedBasket);
				setBasketTotal(basketTotal + parseFloat(patronAmount) * quantityB);
			} else {
				const total = (parseFloat(patronAmount) * quantityB).toFixed(2);
				const patronItem = { name: patronName, units: quantityB, amount: total };
				setBasket([...basket, patronItem]);
				setBasketTotal(+(basketTotal + parseFloat(patronAmount) * quantityB).toFixed(2));
			}
		}

	};

	const patronTicketCount = useMotionValue(0);
	const standardTicketCount = useMotionValue(0);
	const basketCount = useMotionValue(0);
	const patronUnitsCount = useMotionValue(0);
	const standardUnitsCount = useMotionValue(0);

	const patronRounded = useTransform(patronTicketCount, latest => Math.round(latest));
	const standardRounded = useTransform(standardTicketCount, latest => Math.round(latest));
	const basketRounded = useTransform(basketCount, latest => Math.round(latest));
	const patronUnitsRounded = useTransform(patronUnitsCount, latest => Math.round(latest));
	const standardUnitsRounded = useTransform(standardUnitsCount, latest => Math.round(latest));

	useEffect(() => {
		const basketStandard = basket.find((item) => item.name === 'Standard Ticket');
		const basketPatron = basket.find((item) => item.name === 'Patron Ticket');

		const patronControls = animate(patronTicketCount, basketPatron ? parseFloat(basketPatron.amount) : 0)
		const standardControls = animate(standardTicketCount, basketStandard ? parseFloat(basketStandard.amount) : 0)
		const patronUnitsControls = animate(patronUnitsCount, basketPatron ? basketPatron.units : 0)
		const standardUnitsControls = animate(standardUnitsCount, basketStandard ? basketStandard.units : 0)
		const basketControls = animate(basketCount, basketTotal)

		return () => {
			patronControls.stop()
			standardControls.stop()
			patronUnitsControls.stop()
			standardUnitsControls.stop()
			basketControls.stop()
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [basketTotal])


	return (
		<>
			<button className="btn btn-ghost bg-gradient-tertiary text-secondary focus:outline-dashed focus:outline-primary w-auto" onClick={toggleModal}>
				{text}
			</button>
			<Modal
				id="cryptoPayModal"
				show={isOpen}
				dismissible={true}
				position="center"
				size="xl"
				onClose={toggleModal}
				className="mf-modal backdrop-blur-md bg-gradient-to-b from-primary-alpha-30 to-accent-alpha-30 min-h-full transition-all duration-500 ease-in-out"
			>
				<Modal.Header>
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent text-5xl">
						Buy with Crypto
					</span>
				</Modal.Header>
				<Modal.Body>
					<div className="flex flex-col items-start justify-center space-y-3">
						<p className="text-xl text-off-white flex items-center justify-between w-full"><span>Standard Tickets</span> <span className="text-3xl font-bold">{currencySymbol}{prices.standard}</span></p>
						<p className="text-xl text-off-white flex items-center justify-between w-full"><span className="relative bg-clip-text text-transparent bg-gradient-to-r from-tertiary to-accent">Patron Tickets <b className="-translate-x-5 -translate-y-8">✨</b></span> <span className="text-3xl font-bold">{currencySymbol}{prices.patron}</span></p>

						<p className="text-sm">
							Just select the number of each ticket you want to buy, add to your crypto cart then hit &apos;Buy&apos; when you&apos;re done. You&apos;ll be re-directed to the payment page on the <a href="https://paycek.io">Paycek website</a> where you can complete your purchase using your choice of crypto.
						</p>
						<div className="flex flex-row items-center justify-center space-y-3 w-full">
							<input type="hidden" name="amount" value={prices.standard} />
							<input type="hidden" name="name" value="Standard Ticket" />
							<div className="form-control">
								<label className="input-group input-group-sm justify-center" htmlFor="quantity">
									<span className="w-1/4 bg-off-white font-bold text-secondary-dark uppercase">Standard</span>
									<input
										type="number"
										name="quantity"
										id="quantity"
										min="1"
										value={quantity}
										onChange={(e) => setQuantity(+e.target.value)}
										className="input font-bold text-center text-2xl w-3/12"
									/>
									<button
										data-buy-method="crypto"
										className="btn btn-ghost bg-gradient-tertiary text-secondary ticket-method w-auto focus:outline-dashed focus:outline-primary"
										onClick={() => addToBasket('standard')}
									>
										<Icon icon="mdi:cart-plus" className="w-5 h-5" />
										Add to cart
									</button>
								</label>
							</div>
						</div>

						<div className="flex flex-row items-center justify-center space-y-3 w-full">
							<input type="hidden" name="patronAmount" value={prices.patron} />
							<input type="hidden" name="patronName" value="Patron Ticket" />
							<div className="form-control">
								<label className="input-group input-group-sm  justify-center" htmlFor="quantityB">
									<span className="w-1/4 bg-gradient-to-r from-tertiary to-accent font-bold text-secondary-dark uppercase">Patron</span>
									<input
										type="number"
										name="quantityB"
										id="quantityB"
										value={quantityB}
										min="1"
										onChange={(e) => setQuantityB(+e.target.value)}
										className="input font-bold text-center text-2xl w-3/12"
									/>
									<button
										data-buy-method="crypto"
										className="btn btn-ghost bg-gradient-tertiary text-secondary ticket-method w-auto focus:outline-dashed focus:outline-primary"
										onClick={() => addToBasket('patron')}
									>
										<bcon icon="mdi:cart-plus" className="w-5 h-5" />
										Add to cart
									</button>
								</label>
							</div>
						</div>
						<AnimatePresence>
						{basket && basket.length > 0 && (
							<motion.div className="flex flex-col items-start justify-center space-y-3 w-full"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: false }}
								transition={{ duration: 0.3, delay: 0 }}>
								<p className='mb-0 flex w-full items-center font-bold justify-between'><span>Your cart</span> <Icon icon="mdi:cart-variant" className="w-8 h-8" /></p>
								<motion.table className="table table-compact w-full table-zebra"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: false }}
								transition={{ duration: 0.3, delay: 0 }}
								>
									<thead>
									<tr>
										<th>Ticket type</th>
										<th>Quantity</th>
										<th>Amount</th>
										<th>Remove</th>
										</tr>
									</thead>
									<tbody className="text-off-white text-xs">
								{basket.map((item, index) => (
									<motion.tr key={index}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: false }}
										transition={{ duration: 0.3, delay: 0.1 }}
									>
										<td>{item.name}</td>
										<td className="text-center"><motion.span>{item.name === 'Patron Ticket' ? patronUnitsRounded : standardUnitsRounded}</motion.span></td>
										<td className='text-right'>{currencySymbol}<motion.span>{item.name === 'Patron Ticket' ? patronRounded : standardRounded}</motion.span></td>
										<td className="text-center"><button className="btn btn-circle btn-xs btn-error w-auto focus:outline-dashed focus:outline-red-400" onClick={() => removeFromBasket(item.name)}><span className="sr-only">Remove</span> <Icon icon="mdi:delete-forever" className="w-full h-full" /></button></td>
									</motion.tr>
								))}
										<tr>
											<td></td>
											<td className='text-right'>Total</td>
											<td className="text-right">{currencySymbol}<motion.span>{basketRounded}</motion.span></td>
											<td></td>
											</tr>
										</tbody>
									</motion.table>
								<button
									className="btn btn-ghost bg-gradient-tertiary text-secondary w-1/3 focus:outline-dashed focus:outline-primary self-end"
									onClick={() => handlePurchase(basket)}
								>
									Buy
								</button>
							</motion.div>
							)}
							</AnimatePresence>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export const SeedButton = ({ text }: BuyButtonProps): JSX.Element => {
	return (
		<button
			data-buy-method="seed"
			className="btn btn-ghost bg-gradient-tertiary  text-secondary focus:outline-dashed focus:outline-primary w-auto"
			data-tally-open="wL9okp"
			data-tally-layout="modal"
			data-tally-width="800"
			data-tally-align-left="1"
			data-tally-emoji-text="👋"
			data-tally-emoji-animation="wave"
			data-tally-auto-close="5000"
		>
			{text}
		</button>
	);
};

export const SponsorButton = ({ text }: BuyButtonProps): JSX.Element => {

	return (
		<button
			data-buy-method="sponsor"
			className="btn btn-ghost bg-gradient-tertiary  text-secondary focus:outline-dashed focus:outline-primary w-auto"
			data-tally-open="w2XEaj"
			data-tally-layout="modal"
			data-tally-width="800"
			data-tally-align-left="1"
			data-tally-emoji-text="👋"
			data-tally-emoji-animation="wave"
			data-tally-auto-close="5000"
		>
			{text}
		</button>
	);
};

export const CrewButton = ({ text }: BuyButtonProps): JSX.Element => {

	return (
		<button
			data-buy-method="crew"
			className="btn btn-ghost bg-gradient-tertiary  text-secondary focus:outline-dashed focus:outline-primary w-auto"
			data-tally-open="nG675k"
			data-tally-layout="modal"
			data-tally-width="800"
			data-tally-align-left="1"
			data-tally-emoji-text="👋"
			data-tally-emoji-animation="wave"
			data-tally-auto-close="5000"
		>
			{text}
		</button>
	);
};

export const MetagamerButton = ({ text }: BuyButtonProps): JSX.Element => {

	return (
		<button
			data-buy-method="metagamer"
			className="btn btn-ghost bg-gradient-tertiary  text-secondary focus:outline-dashed focus:outline-primary w-auto"
			data-tally-open="mRxrkj"
			data-tally-layout="modal"
			data-tally-width="800"
			data-tally-align-left="1"
			data-tally-emoji-text="👋"
			data-tally-emoji-animation="wave"
			data-tally-auto-close="5000"
		>
			{text}
		</button>
	);
};

export const TicketMethod = ({ title, summary, method, ctaText, price, discount }: TicketMethodProps): JSX.Element => {
	const handleMethod = (method: string, cta: string) => {
		switch (method) {
			case 'fiat':
				return <FiatButton text={cta} />;
			case 'crypto':
				return <CryptoModalButton text={cta} prices={price} />;
			case 'seeds':
				return <SeedButton text={cta} />;
			case 'sponsor':
				return <SponsorButton text={cta} />;
			case 'crew':
				return <CrewButton text={cta} />;
			case 'metagamer':
				return <MetagamerButton text={cta} />;
			default:
				return null;
		}
	};

	const applyDiscount = (price: number | string, discount: number) => {
		if (!discount || discount === 0) {
			return price;
		}
		if (typeof price === 'string') {
			return price;
		}
		return price - (price * discount) / 100;
	};

	return (
		<div className="ticket-method">
			<div className="ticket-method__header text-left">
				<h4 className="mb-3 uppercase bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
					{title}
				</h4>
			</div>
			<div className="ticket-method__content relative text-left p-0 rounded-2xl flex-grow">
				<div className="p-5 z-10 rounded-2xl bg-gradient-to-b from-secondary to-secondary-dark-alpha-60 flex flex-col items-stretch h-full">
					<p className="text-sm xl:text-xl text-primary flex-grow">{summary}</p>
					{price.standard && (
						<p className="text-xl text-off-white flex items-center justify-between w-full">
							<span>Standard tickets</span>
							<span className="text-3xl font-bold uppercase">{currencySymbol}{applyDiscount(price.standard, discount)}</span>
						</p>
					)}
					{price.patron && (
						<p className="text-xl text-off-white flex items-center justify-between w-full">
							<span className="relative bg-clip-text text-transparent bg-gradient-to-r from-tertiary to-accent">Patron tickets <b className="-translate-x-5 -translate-y-8">✨</b></span>
							<span className="text-3xl font-bold uppercase">{currencySymbol}{applyDiscount(price.patron, discount)}</span>
						</p>
					)}
					{price.sponsor && (
						<p className="text-xl text-off-white flex items-center justify-between w-full">
							<span className="relative bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500">Sponsor tickets <b className="-translate-x-5 -translate-y-8">💰</b></span>
							<span className="text-3xl font-bold uppercase">{currencySymbol}{applyDiscount(price.sponsor, discount)}</span>
						</p>
					)}
										{price.crew && (
						<p className="text-xl text-off-white flex items-center justify-between w-full">
							<span className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">Crew tickets <b className="-translate-x-5 -translate-y-8">👷</b></span>
							<span className="text-3xl font-bold uppercase">{currencySymbol}{applyDiscount(price.crew, discount)}</span>
						</p>
					)}
					{price.metagamer && (
						<p className="text-xl text-off-white flex items-center justify-between w-full">
							<span className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-fuchsia-400">MetaGamer tickets <b className="-translate-x-5 -translate-y-8">🐙</b></span>
							<span className="text-3xl font-bold uppercase">{currencySymbol}{applyDiscount(price.metagamer, discount)}</span>
						</p>
					)}
					<div className="text-center w-full self-end">{handleMethod(method, ctaText)}</div>
				</div>
				<div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-accent to-transparent -z-10 pointer-events-none" />
			</div>
		</div>
	);
};
