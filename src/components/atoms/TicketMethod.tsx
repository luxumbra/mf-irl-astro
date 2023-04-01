import { v4 as uuid } from 'uuid';
import { generatePaymentUrl } from '~/utils/utils';

import type { CryptoItemType, PaymentUrlOptions } from '~/utils/utils';
import { paycekProfileCode, paycekSecret } from '~/config.mjs';
import './tier.css';
import { useState } from 'react';
import { Button, Modal } from 'flowbite-react';

export interface TicketMethodProps {
	title: string;
	price: {
		standard: number | string | null;
		patron: number | string | null;
	};
	discount: number | null;
	summary: string;
	method: string;
	ctaText: string;
}

export type TicketMethodType = {
	title: string;
	price: {
		standard: number | string | null;
		patron: number | string | null;
	};
	discount: number | null;
	summary: string;
	method: string;
	ctaText: string;
};

export interface BuyButtonProps {
	text: string;
}

export interface PayloadOptions {
	total: string;
	items: CryptoItemType[];
}

export const FiatButton = ({ text }: BuyButtonProps): JSX.Element => {
	return (
		<button
			data-buy-method="fiat"
			className="btn btn-ghost bg-gradient-tertiary  text-secondary ticket-method w-auto"
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

export const CryptoModalButton = ({ text }: BuyButtonProps): JSX.Element => {
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
			console.log({ total, items });

			return {
				profileID: paycekProfileCode,
				secretKey: paycekSecret,
				paymentID: uuid(),
				totalAmount: total,
				items: items,
				email: null,
				successUrl: 'https://test.metafest.wtf/tickets/success',
				failUrl: '',
				backUrl: '',
				statusUrlCallback: '',
				description: '',
				language: 'en',
			} as PaymentUrlOptions;
		};

		// get the total amount of the basket
		const total = basketData.reduce((acc, item) => {
			return acc + parseInt(item.amount);
		}, 0);

		const data = payload(total.toString(), basketData);

		const url = generatePaymentUrl(data);
		window.open(url, '_blank');
	};

	/**
	 * delete an item from the basket and subtract the quantity and total from the basket total
	 */
	const deleteItem = (name: string) => {
		const updatedBasket = basket.filter((item) => item.name !== name);
		const total = updatedBasket.reduce((acc, item) => {
			return acc + parseInt(item.amount);
		}, 0);
		setBasketTotal(total);

		setBasket(updatedBasket);
	};

	/**
	 * add an item to the basket
	 * @param tier - the tier of the item to be added to the basket
	 * @param quantity - the quantity of the item to be added to the basket
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
					amount: (parseInt(amount) * (itemExists.units + quantity)).toString(),
				};
				const updatedBasket = basket.map((item) => {
					if (item.name === name) {
						return updatedItem;
					}
					return item;
				});
				setBasket(updatedBasket);
			} else {
				const total = (parseInt(amount) * quantity).toString();
				const standardItem = { name, units: quantity, amount: total };
				setBasket([...basket, standardItem]);
			}
		}

		if (tier === 'patron') {
			if (patronItemExists) {
				const updatedItem = {
					...patronItemExists,
					units: patronItemExists.units + quantityB,
					amount: (parseInt(patronAmount) * (patronItemExists.units + quantityB)).toString(),
				};
				const updatedBasket = basket.map((item) => {
					if (item.name === patronName) {
						return updatedItem;
					}
					return item;
				});
				setBasket(updatedBasket);
			} else {
				const total = (parseInt(patronAmount) * quantityB).toString();
				const patronItem = { name: patronName, units: quantityB, amount: total };
				setBasket([...basket, patronItem]);
			}
		}
	};

	return (
		<>
			<button className="btn btn-ghost bg-gradient-tertiary text-secondary ticket-method w-auto" onClick={toggleModal}>
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
						Buy with crypto
					</span>
				</Modal.Header>
				<Modal.Body>
					<div className="flex flex-col items-start justify-center space-y-3">
						<h4 className="text-lg">Prices</h4>
						<p className='text-base'>We&apos;ve got two tiers of tickets for you.</p>
						<p className="text-xl text-off-white flex items-center justify-between w-full"><span>Standard tickets</span> <span className="text-3xl font-extrabold">$150</span></p>
						<p className="text-xl text-off-white flex items-center justify-between w-full"><span className="relative bg-clip-text text-transparent bg-gradient-to-r from-tertiary to-accent">Patron tickets <i className="-translate-x-5 -translate-y-8">✨</i></span> <span className="text-3xl font-extrabold">$420</span></p>

						<p className="text-sm">
							Just select the number of each ticket you want to buy, add to your crypto cart then hit &apos;Buy&apos; when you&apos;re done. You&apos;ll be re-directed to a new page on the Paycek website where you can fill out the remaining info.
						</p>
						<div className="flex flex-row items-end justify-center space-y-3">
							<input type="hidden" name="amount" value="100" />
							<input type="hidden" name="name" value="MetaFest ticket" />
							<div className="form-control">
								<label className="input-group input-group-sm justify-center" htmlFor="quantity">
									<span className="w-1/4">Standard</span>
									<input
										type="number"
										name="quantity"
										id="quantity"
										value={quantity}
										onChange={(e) => setQuantity(+e.target.value)}
										className="input w-1/4"
									/>
									<button
										data-buy-method="crypto"
										className="btn btn-ghost bg-gradient-tertiary text-secondary ticket-method w-auto focus:outline-dashed focus:outline-green-400"
										onClick={() => addToBasket('standard')}
									>
										Add to cart
									</button>
								</label>
							</div>
						</div>

						{/* buy a $420 ticket for extra perks */}
						<div className="flex flex-row items-end justify-center space-y-3">
							<input type="hidden" name="patronAmount" value="420" />
							<input type="hidden" name="patronName" value="MetaFest patron" />
							<div className="form-control">
								<label className="input-group input-group-sm  justify-center" htmlFor="quantityB">
									<span className="w-1/4">Patron</span>
									<input
										type="number"
										name="quantityB"
										id="quantityB"
										value={quantityB}
										onChange={(e) => setQuantityB(+e.target.value)}
										className="input w-1/4"
									/>
									<button
										data-buy-method="crypto"
										className="btn btn-ghost bg-gradient-tertiary text-secondary ticket-method w-auto focus:outline-dashed focus:outline-green-400"
										onClick={() => addToBasket('patron')}
									>
										Add to cart
									</button>
								</label>
							</div>
						</div>

						<div className="flex flex-col items-start justify-center space-y-1">
							{basket && basket.length > 0 && (
								<>
									<p>Here&apos;s what&apos;s in your cart:</p>
									{basket.map((item, index) => (
										<div key={index} className="flex flex-row items-center justify-between w-full">
											<p>{item.name}</p>
											<p>{item.units}</p>
											<p>{item.amount}</p>
										</div>
									))}
									<button
										className="btn btn-ghost bg-gradient-tertiary text-secondary ticket-method w-auto focus:outline-dashed focus:outline-green-400"
										type='button'
										onClick={() => handlePurchase(basket)}
									>
										Buy
									</button>
								</>
							)}
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export const SeedButton = ({ text }: BuyButtonProps): JSX.Element => {
	const handleClick = () => {
		const payCek = 'Need to add seed pay Tally/Modal here';
		console.log(payCek);
	};

	return (
		<button
			data-buy-method="seed"
			className="btn btn-ghost bg-gradient-tertiary  text-secondary ticket-method w-auto"
			onClick={handleClick}
		>
			{text}
		</button>
	);
};

export const SponsorButton = ({ text }: BuyButtonProps): JSX.Element => {
	const handleClick = () => {
		const payCek = 'Need to add sponsor pay Tally/Modal here';
		console.log(payCek);
	};

	return (
		<button
			data-buy-method="sponsor"
			className="btn btn-ghost bg-gradient-tertiary  text-secondary ticket-method w-auto"
			onClick={handleClick}
		>
			{text}
		</button>
	);
};

export const CrewButton = ({ text }: BuyButtonProps): JSX.Element => {
	const handleClick = () => {
		const payCek = 'Need to add crew pay Tally/Modal here';
		console.log(payCek);
	};

	return (
		<button
			data-buy-method="crew"
			className="btn btn-ghost bg-gradient-tertiary  text-secondary ticket-method w-auto"
			onClick={handleClick}
		>
			{text}
		</button>
	);
};

export const MetagamerButton = ({ text }: BuyButtonProps): JSX.Element => {
	const handleClick = () => {
		const payCek = 'Need to add metagamer pay Tally/Modal here';
		console.log(payCek);
	};

	return (
		<button
			data-buy-method="metagamer"
			className="btn btn-ghost bg-gradient-tertiary  text-secondary ticket-method w-auto"
			onClick={handleClick}
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
				return <CryptoModalButton text={cta} />;
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
					<p className="text-xl text-off-white flex items-center justify-between w-full">
						<span>Standard tickets</span>
						<span className="text-3xl font-extrabold">${applyDiscount(price.standard, discount)}</span>
					</p>

					<p className="text-xl text-off-white flex items-center justify-between w-full">
						<span className="relative bg-clip-text text-transparent bg-gradient-to-r from-tertiary to-accent">Patron tickets <i className="-translate-x-5 -translate-y-8">✨</i></span>
						<span className="text-3xl font-extrabold">${applyDiscount(price.patron, discount)}</span>
					</p>
					<div className="text-center w-full self-end">{handleMethod(method, ctaText)}</div>
				</div>
				<div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-accent to-transparent -z-10 pointer-events-none" />
			</div>
		</div>
	);
};
