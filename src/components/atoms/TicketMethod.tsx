import { v4 as uuid } from 'uuid';
import { generatePaymentUrl } from '~/utils/utils';

import type { CryptoItemType, PaymentUrlOptions } from '~/utils/utils';
import { paycekProfileCode, paycekSecret } from '~/config.mjs';
import './tier.css';
import { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { is } from '@react-three/fiber/dist/declarations/src/core/utils';
import ThreeD from '../widgets/ThreeD';

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


    // const form = document.getElementById('cryptoPayForm');
    // const amountInput = document.querySelector('input[name="amount"]');
    // const amount = amountInput.getAttribute('value');
    // const nameInput = document.querySelector('input[name="name"]');
    // const total = (parseInt(amount) * quantity).toString();
    // const name = nameInput.getAttribute('value');
    // const data = payload(total, [{ name, units: quantity, amount: total }], '');
    // console.log(data);

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
    const vipAmountInput = document.querySelector('input[name="vipAmount"]');
    const vipAmount = vipAmountInput.getAttribute('value');
    const vipNameInput = document.querySelector('input[name="vipName"]');
    const vipName = vipNameInput.getAttribute('value');

    /**
     *  if an item of the same type is already in the basket, update the quantity and total instead of adding a new item, if not, add a new item to the basket and update the basket total
     */
    const itemExists = basket.find((item) => item.name === name);
    const vipItemExists = basket.find((item) => item.name === vipName);

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

    if (tier === 'vip') {
      if (vipItemExists) {
        const updatedItem = {
          ...vipItemExists,
          units: vipItemExists.units + quantityB,
          amount: (parseInt(vipAmount) * (vipItemExists.units + quantityB)).toString(),
        };
        const updatedBasket = basket.map((item) => {
          if (item.name === vipName) {
            return updatedItem;
          }
          return item;
        });
        setBasket(updatedBasket);
      } else {
        const total = (parseInt(vipAmount) * quantityB).toString();
        const vipItem = { name: vipName, units: quantityB, amount: total };
        setBasket([...basket, vipItem]);
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
        size="lg"
        onClose={toggleModal}
        className="mf-modal backdrop-blur-md bg-gradient-to-b from-primary-alpha-30 to-accent-alpha-30 min-h-full transition-all duration-500 ease-in-out"
      >
        <Modal.Header>
          <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent text-5xl">
            Buy with crypto
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col items-start justify-center space-y-3">
            <p className='text-xl'>Weve got two tiers of tickets for you.</p>
            <p className="font-bold text-off-white">Standard tickets cost $100</p>
            <p className="font-bold text-off-white">VIP tickets cost $420</p>

            <p>
              Just select the number of each ticket you want to buy, add to your crypto cart then hit &apos;Buy&apos; when you&apos;re done. You&apos;ll be re-directed to a new page on the Paycek website where you can fill out the remaining info.
            </p>
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
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(+e.target.value)}
                  className="input"
                />
              </div>
              <button
                data-buy-method="crypto"
                className="btn btn-ghost bg-gradient-tertiary text-secondary ticket-method w-auto focus:outline-dashed focus:outline-green-400"
                onClick={() => addToBasket('standard')}
              >
                Add to cart
              </button>
            </div>

            {/* buy a $420 ticket for extra perks */}
            <div className="flex flex-row items-end justify-center space-x-5">
              <input type="hidden" name="vipAmount" value="420" />
              <input type="hidden" name="vipName" value="MetaFest VIP" />
              <div className="form-control w-1/3">
                <label className="label" htmlFor="quantityB">
                  <span className="label-text text-off-white">Quantity</span>
                </label>
                <input
                  type="number"
                  name="quantityB"
                  id="quantityB"
                  value={quantityB}
                  onChange={(e) => setQuantityB(+e.target.value)}
                  className="input"
                />
              </div>
              <button
                data-buy-method="crypto"
                className="btn btn-ghost bg-gradient-tertiary text-secondary ticket-method w-auto focus:outline-dashed focus:outline-green-400"
                onClick={() => addToBasket('vip')}
              >
                Add to cart
              </button>
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

export const TicketMethod = ({ title, summary, method, ctaText }: TicketMethodProps): JSX.Element => {
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
          <div className="text-center w-full self-end">{handleMethod(method, ctaText)}</div>
        </div>
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-accent to-transparent -z-10 pointer-events-none" />
      </div>
    </div>
  );
};
