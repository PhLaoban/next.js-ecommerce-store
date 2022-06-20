import '@fortawesome/fontawesome-svg-core/styles.css';
import { css } from '@emotion/react';
import {
  faCcAmex,
  faCcApplePay,
  faCcMastercard,
  faCcPaypal,
  faCcVisa,
} from '@fortawesome/free-brands-svg-icons';
import { faCircleInfo, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { getCoffees } from '../util/database';

// const inputFields = css`
//   display: flex;
//   flex-direction: row;
//   padding: 20px;
// `;

// const outerDiv = css`
//   display: flex;
//   flex-direction: column;
//   min-height: 70%;
//   max-width: 70%;
// `;

const mainwrapper = css`
  color: white;
  height: auto;
  width: auto;
  justify-content: center;
  display: flex;

  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);

  overflow: hidden;
`;

const itemNameStyles = css`
  font-weight: 600;
  margin-right: 15px;
`;

const itemInfoStyles = css`
  margin-right: 10px;
`;

const formWrapperStyles = css`
  max-width: 700px;
  margin-right: auto;
`;

const formStyles = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-right: 10px;
  margin-bottom: 30px;

  padding: 8px;
  padding-top: 25px;

  div {
    margin-bottom: 15px;
  }

  div label {
    margin-right: 5px;
  }

  div label span {
    white-space: nowrap;
    margin-right: 3px;
  }
`;

const entryFieldWrapperStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  #a {
    padding-right: 35px;
  }
  #b {
    padding-right: 50px;
  }

  label {
    display: flex;
    flex-basis: 49%;
    justify-content: space-between;

    @media (max-width: 740px) {
      flex-direction: column;
    }
  }

  @media (max-width: 740px) {
    flex-direction: column;
  }
`;

const removeButton = css`
  cursor: pointer;
  color: grey;
  filter: brightness(2);
  background-color: #0b2e7a;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  min-height: 6vh;
  min-width: 10vw;

  &:hover {
    transition: 0.9 ease-in-out;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  &:active {
    transform: translateX(1px) translateY(-1.8px);
  }
`;

const mainwrapperDiv = css`
  color: white;
  max-width: 20vw;
`;

const inputStyle = css`
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-bottom: 0px solid rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  border-bottom: 1px solid #333;
`;

const paymentDiv = css`
  border-bottom: 1px solid #333;
`;

const totalDiv = css`
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
`;

const amountNumber = css`
  display: flex;

  #number {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 0.2px solid;
    justify-content: center;
    display: flex;
    align-items: center;
  }
`;

export default function Checkout(props, { action = '/thankyou' }) {
  const [cartCounter, setCartCounter] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const cookie = getParsedCookie('cart') || [];
    const totalCartItems = cookie.reduce(
      (prevValue, currentValue) =>
        prevValue + currentValue.itemQuantity * currentValue.price,
      0,
    );
    setCartCounter(Number(totalCartItems));
  }, [cartCounter]);

  // preventDefault function for form

  const preventDefault = (f) => (e) => {
    e.preventDefault();
    f(e);
  };

  // handlesubmit, that removes cookies and leads you to the thank you page

  const handleSubmit = preventDefault(() => {
    console.log('FORM SUBMITTED');
    setStringifiedCookie('cart', []);
    props.setCartCounter(0);
    Cookies.remove('cart');
    router
      .push({
        pathname: action,
      })
      .catch(() => {
        console.log('Error while doing router.push()');
      });
  });

  function calculateTotalSum() {
    let total = 0;
    props.cart.map((cartItem) => {
      return (total +=
        props.items.find((item) => {
          return cartItem.id === item.id;
        }).price * cartItem.itemQuantity);
    });
    return total;
  }

  return (
    <>
      <Head>
        <title>Coffee Club</title>
        <meta name="checkout" content="checkout page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={mainwrapper}>
        <main>
          <div>
            <div>
              <div css={mainwrapperDiv}>
                <h1>
                  Checkout <FontAwesomeIcon icon={faCreditCard} />
                </h1>
                &nbsp;
                <div>
                  <h2> Selected Items:</h2>
                  {props.cart.map((cartItem) => {
                    return (
                      <div key={`item-${cartItem.id}`}>
                        <span css={itemNameStyles}>
                          <br />
                          {
                            props.items.find((item) => {
                              return cartItem.id === item.id;
                            }).name
                          }
                        </span>
                        <br />
                        <span css={itemInfoStyles}>
                          Price:&nbsp;
                          {Math.round(
                            props.items.find((item) => {
                              return cartItem.id === item.id;
                            }).price,
                          ).toFixed(2)}
                          €
                        </span>
                        <br />

                        <div css={amountNumber}>
                          Amount: &nbsp;{' '}
                          <div id="number">{cartItem.itemQuantity} </div> &nbsp;
                          pcs
                        </div>
                      </div>
                    );
                  })}
                  <br />
                  <br />

                  <div css={totalDiv}>
                    Total: {Math.round(calculateTotalSum()).toFixed(2)} €
                  </div>
                </div>
              </div>
            </div>
            <h2>
              Customer Information <FontAwesomeIcon icon={faCircleInfo} />
            </h2>

            <div css={formWrapperStyles}>
              <form css={formStyles} onSubmit={handleSubmit}>
                <div>
                  <div css={entryFieldWrapperStyles}>
                    <label>
                      <span>First name</span>
                      <input
                        css={inputStyle}
                        data-test-id="checkout-first-name"
                        required
                      />
                    </label>

                    <label>
                      <span>Last name</span>
                      <input
                        css={inputStyle}
                        data-test-id="checkout-last-name"
                        required
                      />
                    </label>
                  </div>
                  <div css={entryFieldWrapperStyles}>
                    <label>
                      <span>E-Mail address</span>
                      <input
                        css={inputStyle}
                        data-test-id="checkout-email"
                        required
                      />
                    </label>
                  </div>
                </div>
                <div css={paymentDiv}>
                  <div css={entryFieldWrapperStyles}>
                    <label>
                      <span>Address</span>
                      <input
                        css={inputStyle}
                        data-test-id="checkout-address"
                        required
                      />
                    </label>
                    <label>
                      <span>City</span>
                      <input
                        css={inputStyle}
                        data-test-id="checkout-city"
                        required
                      />
                    </label>
                  </div>
                  <div css={entryFieldWrapperStyles}>
                    <label>
                      <span>Postal code</span>
                      <input
                        css={inputStyle}
                        data-test-id="checkout-postal-code"
                        required
                      />
                    </label>
                    <label>
                      <span>Country</span>
                      <input
                        css={inputStyle}
                        data-test-id="checkout-country"
                        required
                      />
                    </label>
                  </div>
                </div>
                <div css={paymentDiv}>
                  <h2>Payment </h2>
                  <h2>
                    <FontAwesomeIcon icon={faCcPaypal} />
                    &nbsp;
                    <FontAwesomeIcon icon={faCcApplePay} />
                    &nbsp;
                    <FontAwesomeIcon icon={faCcAmex} />
                    &nbsp;
                    <FontAwesomeIcon icon={faCcMastercard} />
                    &nbsp;
                    <FontAwesomeIcon icon={faCcVisa} />
                  </h2>
                  <div css={entryFieldWrapperStyles}>
                    <label>
                      <span id="c">Credit card number</span>
                      <input
                        css={inputStyle}
                        data-test-id="checkout-credit-card"
                        required
                      />
                    </label>
                  </div>
                  <div css={entryFieldWrapperStyles}>
                    <label>
                      <span id="a">Expiration date</span>
                      <input
                        css={inputStyle}
                        data-test-id="checkout-expiration-date"
                        required
                      />
                    </label>
                    <label>
                      <span id="b">Security code</span>
                      <input
                        css={inputStyle}
                        data-test-id="checkout-security-code"
                        required
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <button
                    css={removeButton}
                    data-test-id="checkout-confirm-order"
                  >
                    Confirm Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // database items
  const databaseItems = await getCoffees();

  // cart cookie
  const cart = JSON.parse(context.req.cookies.cart || '[]');
  console.log('cart from cart serverside: ', cart);

  return { props: { cart: cart, items: databaseItems } };
}
