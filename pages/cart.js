import { css } from '@emotion/react';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { createRef, useRef, useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { getCoffees } from '../util/database';

const buttonStyle = css`
  cursor: pointer;
  border: none;
  border-radius: 4px;
  height: 45px;
  padding: 0 48px;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  width: 200px;
  font-weight: 0;

  background: rgba(0, 46, 173, 1);
  color: white;
  margin-right: 24px;
  &:hover {
    transition: 0.9 ease-in-out;
    background-color: rgba(255, 255, 255, 0.1);
  }
  &:active {
    transform: translateX(2px) translateY(-2.5px);
  }
`;
const checkout = css`
  width: auto;
  display: flex;
  justify-content: space-between;
`;

const headlineDiv = css`
  font-size: 25px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  height: 200px;
  padding-bottom: 40px;
`;

const headline = css`
  color: white;
  border-bottom: 1px solid #333;
  border-color: grey;
  /* background-color: white; */
  /* height: auto;
  width: auto; */
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-column-gap: 130px;
  /* flex-direction: row;
  flex-wrap: nowrap; */

  height: 50px;
  font-size: 28px;

  #description {
    font-size: 14px;
    padding-left: 50px;
  }
  #quantity {
    font-size: 14px;
    padding-left: 200px;
    padding-right: 120px;
  }
  #remove {
    font-size: 14px;
    padding-right: 80px;
  }
  #amount {
    font-size: 14px;
    padding-left: 70px;
  }
`;

const mainStyle = css`
  color: white;
  height: auto;
  width: auto;

  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);

  overflow: hidden;
  display: flex;

  #fonstyle {
    #description {
      /* padding-left: 50px; */
      width: 380px;
      font-size: 15px;
      color: white;
      background-color: white;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    filter: brightness(1.4);
    font-size: 25px;
    padding: 10px;
    background: #ca4246;
    background-color: white;

    // background size settings

    background-size: 57%;
    background-repeat: repeat;

    /* This will show the gradient as a text color rather than element bg. */
    background-clip: text;
    -webkit-text-fill-color: transparent;

    /* Animate the text when loading the element. */
    /* This animates it on page load and when hovering out. */
    animation: rainbow-text-animation-rev 0.5s ease forwards;

    cursor: pointer;
  }

  /* Add animation on hover. */
  &:hover {
    animation: rainbow-text-animation 0.5s ease forwards;
  }

  font-size: 20px;
  font-style: inherit;
  letter-spacing: 2px;
  padding: 50px;

  #new {
    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-template-rows: repeat(2, auto);
    width: fit-content;
    height: fit-content;
    border: 0.2px;
    /* padding-left: 50px; */
    border-color: white;
    align-items: center;
    border-bottom: 1px solid #333;
  }
  #imgDiv {
    padding: 15px;

    #imgStyle {
      border-radius: 10px;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
        transition: 1 ease-in-out;
      }
    }
  }
  .quantity {
    font-size: 15px;
    padding-left: 70px;
  }
  .removeDiv {
    font-size: 12px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 295px;
    opacity: 0.8;
    /* padding-left: 100px; */
    padding-right: 73px;
  }
  .price {
    font-size: 15px;
    display: flex;
    width: 400px;
    flex-direction: row;
    justify-content: flex-end;
    padding-right: 68px;
  }
`;

const removeButton = css`
  cursor: pointer;
  color: grey;
  filter: brightness(2);
  background-color: transparent;
  border: none;
  font-size: 15px;

  &:hover {
    transition: 0.9 ease-in-out;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  &:active {
    transform: translateX(1px) translateY(-1.8px);
  }
`;

const inputField = css`
  font-family: inherit;
  width: 30%;
  border: 0;
  border-radius: 2px;
  outline: 0;
  padding-top: 30px;
  font-size: 1.3rem;
  /* color: $white; */
  background-color: #141b26;
  opacity: 0.68;
  padding: 7px 0;
  transition: border-color 0.2s;
  color: rgba(255, 255, 255, 2);
  /* background: transparent; */

  &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }
`;

export default function Cart(props) {
  const [cart, setCart] = useState(props.currentCart);

  // total amount
  const total = props.currentCart
    .reduce(
      (prevValue, currentValue) =>
        prevValue + currentValue.itemQuantity * currentValue.price,
      0,
    )
    .toFixed(2);

  // calculate total amount of items

  const refs = useRef([createRef(), createRef()]);

  return (
    <div css={mainStyle}>
      <Head>
        <title>Coffee Club</title>
        <meta name="cart" content="cart page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div css={headlineDiv}>
          <h1>
            My Cart <FontAwesomeIcon icon={faBagShopping} />
          </h1>
        </div>
        <div css={headline}>
          <div className="alignment">
            <p id="description">Description</p>
          </div>
          <div className="alignment">
            <p id="quantity">Quantity</p>
          </div>
          <div>
            <p id="remove">Remove</p>
          </div>
          <div>
            <p id="amount">Amount</p>
          </div>
        </div>
        {/* <hr /> */}
        <div>
          {cart.map((product, index) => {
            return (
              <div id="new" key={`productId-${product.id}`}>
                <div id="imgDiv">
                  <Image
                    id="imgStyle"
                    src={product.image}
                    width="60"
                    height="90"
                  />
                </div>

                <div id="fonstyle">
                  {product.name}
                  <p id="description">
                    {' '}
                    {product.description} <br />
                    <br />
                    {product.price}€
                  </p>
                </div>
                <div className="quantity">
                  {' '}
                  <input
                    css={inputField}
                    type="number"
                    ref={refs.current[index]}
                    min="1"
                    max={props.database.find((item) => {
                      return product.id === item.id;
                    })}
                    defaultValue={product.itemQuantity}
                    onInput={(event) => {
                      if (!event.currentTarget.validity.valid) {
                        event.currentTarget.value = '';
                      }
                    }}
                    onChange={(event) => {
                      console.log(event);
                      const updatedCart = cart.slice();
                      updatedCart.find((item) => {
                        return item.id === product.id;
                      }).itemQuantity = Number(event.currentTarget.value);
                      let newTotalNumberOfItems = 0;
                      for (let i = 0; i < updatedCart.length; i++) {
                        newTotalNumberOfItems += updatedCart[i].itemQuantity;
                      }
                      console.log(newTotalNumberOfItems);
                      props.setCartCounter(newTotalNumberOfItems);
                      console.log('updated cart state: ', updatedCart);
                      setStringifiedCookie('cart', updatedCart);
                      setCart(updatedCart);
                    }}
                  />{' '}
                  pcs
                </div>

                <div className="removeDiv">
                  <form>
                    <button
                      css={removeButton}
                      onClick={() => {
                        product.cartCounter = 0;

                        const updateArray = cart.filter(
                          (productDelete) => productDelete.cartCounter !== 0,
                        );

                        // 1. update the sate
                        setCart(updateArray);
                        // 2. cookies begin
                        const currentCart = getParsedCookie('cart');
                        // 3. get the products from the cookies
                        const currentProduct = currentCart.find(
                          (productInCart) => product.id === productInCart.id,
                        );
                        // 4. update the quantity to 0
                        currentProduct.cartCounter = 0;
                        // 5. create new cart
                        const updatedCart = currentCart.filter(
                          (currentProductInCart) =>
                            currentProductInCart.cartCounter !== 0,
                        );
                        // 6. set the new cookie update after deleting
                        setStringifiedCookie('cart', updatedCart);
                      }}
                    >
                      {' '}
                      X
                    </button>
                  </form>
                </div>
                <div className="price">
                  {' '}
                  {product.itemQuantity * product.price}€
                </div>
              </div>
            );
          })}
        </div>
        <br />
        <div css={checkout}>
          Total Amount: {total} €{' '}
          <Link href="/checkout">
            <button css={buttonStyle}>Proceed to checkout</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const database = await getCoffees();
  const cart = JSON.parse(context.req.cookies.cart || '[]');

  console.log('cart from cart serverside: ', cart);

  const currentCart = cart.map((item) => {
    const itemInCart = database.find((product) => product.id === item.id);
    return { ...itemInCart, ...item };
  });

  return {
    props: {
      currentCart,
      cart,
      database,
    },
  };
}
