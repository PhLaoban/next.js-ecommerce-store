import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { getCoffees } from '../util/database';

const buttonStyle = css`
  cursor: pointer;
  border: none;
  border-radius: 8px;
  height: 40px;
  padding: 0 48px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.06rem;
  width: 200px;
  filter: brightness(1.7);
  background: rgba(0, 46, 173, 0.4);
  color: white;
  margin-right: 24px;
  &:hover {
    transition: 0.9 ease-in-out;
    background-color: #002ead;
    /* transition: 0.7s; */
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

const main = css`
  /* width: 1000px; */
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
  }
  .removeDiv {
    font-size: 12px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 295px;
    opacity: 0.8;
    /* padding-left: 100px; */
    margin-right: -20px;
  }
  .price {
    font-size: 15px;
    display: flex;
    width: 400px;
    flex-direction: row;
    justify-content: flex-end;
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
    /* transition: 0.7s; */
  }
  &:active {
    transform: translateX(1px) translateY(-1.8px);
  }
`;

export default function About(props) {
  // console.log(props.currentCart);
  // console.log(props.database);

  const [cart, setCart] = useState(props.currentCart);

  // total amount
  const total = props.currentCart
    .reduce(
      (prevValue, currentValue) =>
        prevValue + currentValue.itemQuantity * currentValue.price,
      0,
    )
    .toFixed(2);

  // remove button function

  async function removeItemFromCart(id) {
    const currentCart = (await Cookies.get('cart'))
      ? getParsedCookie('cart')
      : [];
    const productInCart = await currentCart.find(
      (product) => product.id === id,
    );
    if (productInCart.cartCounter > 1) {
      productInCart.cartCounter -= 1;
    } else {
      const removeIndex = await currentCart
        .map(function (item) {
          return item.id;
        })
        .indexOf(id);
      currentCart.splice(removeIndex, 1);
    }
    setStringifiedCookie('cart', currentCart);
    return currentCart;
  }

  return (
    <div css={mainStyle}>
      <Head> E-Commerce Store </Head>
      <main css={main}>
        <div css={headlineDiv}>
          <h1>My Cart</h1>
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
          {cart.map((product) => {
            return (
              <div id="new" key={`productId-${product.id}`}>
                {/* {product.image} */}
                {/* <Image src={product.image} width={200} height={250} /> */}
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
                    {/* {props.cart.map((c) => {
                      return <div key={c.id}>{c.itemQuantity}</div>;
                    })} */}
                  </p>
                </div>
                <div className="quantity"> {product.itemQuantity} pcs</div>

                <div className="removeDiv">
                  <button
                    onClick={() => {
                      const newQuantity = product.itemQuantity + 1;

                      const updatedArray = cart.map((t) =>
                        t.id === cart.id
                          ? { ...t, itemQuantity: newQuantity }
                          : t,
                      );
                      setCart(updatedArray);
                      // 1. get the cookie
                      const currentCart = getParsedCookie('cart');
                      // 2. get the product
                      const currentProduct = currentCart.find(
                        (coffeeInCart) => product.id === coffeeInCart.id,
                      );
                      // 3. update the quantity of products
                      currentProduct.itemQuantity += 1;

                      // 4. set the new cookie
                      setStringifiedCookie('cart', currentCart);
                    }}
                  >
                    +
                  </button>{' '}
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
                      //   const updatedCart = cart.filter((item) => {
                      //     return item.itemId !== product.itemId;
                      //   });
                      //   console.log('after filter: ', updatedCart);
                      //   setStringifiedCookie('cart', updatedCart);
                      //   setCart(updatedCart);
                      // }}
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
                {/* </form> */}
              </div>
            );
          })}
        </div>
        <br />
        <div css={checkout}>
          Total Amount: {total} €{' '}
          <button css={buttonStyle}>Proceed to checkout</button>
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
    },
  };
}
