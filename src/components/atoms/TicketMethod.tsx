
import './tier.css';

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
		>{text}</button>
	);
};

export const CryptoButton = ({ text }: BuyButtonProps): JSX.Element => {
	const handleClick = () => {
		const payCek = 'Need to integrate PayCek here';
		console.log(payCek);
	}

	return (
		<button
			data-buy-method="crypto"
			className="btn btn-ghost bg-gradient-tertiary  text-secondary ticket-method w-auto"
			onClick={handleClick}
		>{text}</button>
	);
};

export const SeedButton = ({ text }: BuyButtonProps): JSX.Element => {
	const handleClick = () => {
		const payCek = 'Need to add seed pay Tally/Modal here';
		console.log(payCek);
	}

	return (
		<button
			data-buy-method="seed"
			className="btn btn-ghost bg-gradient-tertiary  text-secondary ticket-method w-auto"
			onClick={handleClick}
		>{text}</button>
	);
};

export const SponsorButton = ({ text }: BuyButtonProps): JSX.Element => {
	const handleClick = () => {
		const payCek = 'Need to add sponsor pay Tally/Modal here';
		console.log(payCek);
	}

	return (
		<button
			data-buy-method="sponsor"
			className="btn btn-ghost bg-gradient-tertiary  text-secondary ticket-method w-auto"
			onClick={handleClick}
		>{text}</button>
	);
};

export const CrewButton = ({ text }: BuyButtonProps): JSX.Element => {
	const handleClick = () => {
		const payCek = 'Need to add crew pay Tally/Modal here';
		console.log(payCek);
	}

	return (
		<button
			data-buy-method="crew"
			className="btn btn-ghost bg-gradient-tertiary  text-secondary ticket-method w-auto"
			onClick={handleClick}
		>{text}</button>
	);
};

export const MetagamerButton = ({ text }: BuyButtonProps): JSX.Element => {
	const handleClick = () => {
		const payCek = 'Need to add metagamer pay Tally/Modal here';
		console.log(payCek);
	}

	return (
		<button
			data-buy-method="metagamer"
			className="btn btn-ghost bg-gradient-tertiary  text-secondary ticket-method w-auto"
			onClick={handleClick}
		>{text}</button>
	);
};


export const TicketMethod = ({ title,
	summary,
	method,
	ctaText }: TicketMethodProps): JSX.Element => {

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
				<h4 className="mb-3 uppercase text-off-white">{title}</h4>
			</div>
			<div className="ticket-method__content relative text-left p-0 rounded-2xl">
				<div className="p-5 z-10 rounded-2xl bg-gradient-to-b from-secondary to-secondary-dark">
					<p className="text-sm xl:text-xl text-primary">{summary}</p>
					<div className="tier__perks text-center">
						{handleMethod(method, ctaText)}
					</div>
				</div>
				<div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-accent to-transparent -z-10 pointer-events-none" />
			</div>
		</div>
	);
}
