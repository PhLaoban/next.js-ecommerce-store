import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { getCoffees } from '../util/database';

const mainStyle = css`
  display: flex;
  justify-content: center;
  color: white;
  flex-direction: column;
  height: auto;
  width: auto;

  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  height: 100vh;
  overflow: hidden;
  display: flex;
  font-family: 'Anton', sans-serif;
  align-items: center;
  #fonstyle {
    filter: brightness(1.4);
    font-size: 25px;
    padding: 10px;
    background: #ca4246;
    background-color: #ca4246;
    background: conic-gradient(
      #ca4246 16.666%,
      #e16541 16.666%,
      #e16541 33.333%,
      #f18f43 33.333%,
      #f18f43 50%,
      #8b9862 50%
    );

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

  /* Move the background and make it larger. */
  /* Animation shown when hovering over the text. */
  @keyframes rainbow-text-animation {
    0% {
      background-size: 57%;
      background-position: 0 0;
    }
    20% {
      background-size: 57%;
      background-position: 0 1em;
    }
    100% {
      background-size: 300%;
      background-position: -9em 1em;
    }
  }

  /* Move the background and make it smaller. */
  /* Animation shown when entering the page and after the hover animation. */
  @keyframes rainbow-text-animation-rev {
    0% {
      background-size: 300%;
      background-position: -9em 1em;
    }
    20% {
      background-size: 57%;
      background-position: 0 1em;
    }
    100% {
      background-size: 57%;
      background-position: 0 0;
    }
  }

  font-size: 20px;
  font-style: inherit;
  letter-spacing: 2px;
  padding: 50px;

  #imgDiv {
    padding: 20px;

    #imgStyle {
      border-radius: 10px;
    }
  }
`;

export default function About(props) {
  console.log(props.cart);
  console.log(props.database);
  const [cart, setCart] = useState(props.currentCart);

  return (
    <div css={mainStyle}>
      <Head> E-Commerce Store </Head>
      <main>
        <h1>My Cart</h1>
        <div>
          {cart.map((product) => {
            return (
              <div key={`productId-${product.id}`}>
                {/* {product.image} */}

                {/* <Image src={product.image} width={200} height={250} /> */}

                <div id="imgDiv">
                  <Image
                    id="imgStyle"
                    src={product.image}
                    width="300"
                    height="350"
                  />
                </div>

                {product.description}
                <br />
                <div id="fonstyle">{product.name}</div>
              </div>
            );
          })}
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
    },
  };
}
