import { v4 as uuid } from 'uuid';
import { generatePaymentUrl } from '~/utils/utils';

import type { CryptoItemType, PaymentUrlOptions } from '~/utils/utils';
import { paycekProfileCode, paycekSecret } from '~/config.mjs';
import './tier.css';
import { useState } from 'react';

export interface TicketMethodProps {
	title: string;
	price: number;
	summary: string;
	method: string;
	ctaText: string;
}

export type TicketMethodType = {
	title: string;
	price: number;
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
	email: string;
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

export const CryptoModal = (): JSX.Element => {
	return (
		<>
		<label htmlFor="my-modal-3" className="btn btn-ghost bg-gradient-tertiary text-secondary ticket-method w-auto focus:outline-dashed focus:outline-green-400">open modal</label>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my-modal-3" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
    <p className="py-4">You&apos;ve been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
  </div>
			</div>
		</>
	);
};

export const CryptoButton = ({ text }: BuyButtonProps): JSX.Element => {
	const [quantity, setQuantity] = useState(1);


	const handlePurchase = () => {
		const payload = (
			total: PayloadOptions['total'],
			items: PayloadOptions['items'],
			email: PayloadOptions['email']
		) => {
			console.log({ total, items, email });

			return {
				profileID: paycekProfileCode,
				secretKey: paycekSecret,
				paymentID: uuid(),
				totalAmount: total,
				items: items,
				email: email,
				successUrl: 'https://test.metafest.wtf/tickets/success',
				failUrl: '',
				backUrl: '',
				statusUrlCallback: '',
				description: '',
				language: 'en',
			} as PaymentUrlOptions;
		};

		// const form = document.getElementById('cryptoPayForm');
		const amountInput = document.querySelector('input[name="amount"]');
		const amount = amountInput.getAttribute('value');
		const nameInput = document.querySelector('input[name="name"]');
		const total = (parseInt(amount) * quantity).toString();
		const name = nameInput.getAttribute('value');
		const data = payload(total, [{ name, units: quantity, amount: total }], '');
		console.log(data);

		const url = generatePaymentUrl(data);
		window.open(url, '_blank');
	};

	return (
		<>
			<div className="flex flex-row items-end justify-center space-x-5">
			<input type="hidden" name="amount" value="100" />
			<input type="hidden" name="name" value="MetaFest ticket" />
				<div className="form-control w-1/3">
					<label className="label" htmlFor="quantity">
						<span className="label-text text-off-white">Quantity</span>
					</label>
					<input
						type="number"
						name="quantity"
						id='quantity'
						value={quantity}
						onChange={(e) => setQuantity(+e.target.value)}
						className="input"
					/>
				</div>
				<button
					data-buy-method="crypto"
					className="btn btn-ghost bg-gradient-tertiary text-secondary ticket-method w-auto focus:outline-dashed focus:outline-green-400"
					onClick={handlePurchase}
				>
					{text}
				</button>
				<CryptoModal />
			</div>
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

export const TicketMethod = ({ title, summary, method, ctaText }: TicketMethodProps): JSX.Element => {
	const handleMethod = (method: string, cta: string) => {
		switch (method) {
			case 'fiat':
				return <FiatButton text={cta} />;
			case 'crypto':
				return <CryptoButton text={cta} />;
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

	return (
		<div className={`ticket-method w-auto`}>
			<div className="ticket-method__header text-left">
				<h4 className="mb-3 uppercase bg-clip-text text-transparent bg-gradient-to-l from-primary to-off-white">
					{title}
				</h4>
			</div>
			<div className="ticket-method__content relative text-left p-0 rounded-2xl">
				<div className="p-5 z-10 rounded-2xl bg-gradient-to-b from-secondary to-secondary-dark">
					<p className="text-sm xl:text-xl text-primary">{summary}</p>
					<div className="tier__perks text-center">{handleMethod(method, ctaText)}</div>
				</div>
				<div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-accent to-transparent -z-10 pointer-events-none" />
			</div>
		</div>
	);
};
