import '@fortawesome/fontawesome-svg-core/styles.css';
import { css, Global } from '@emotion/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import { getParsedCookie } from '../util/cookies';

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const [cartCounter, setCartCounter] = useState(0);

  // I keep this here just in case...
  if (!pageProps) {
    pageProps = {};
  }

  useEffect(() => {
    const cookie = getParsedCookie('cart') || [];
    const totalCartItems = cookie.reduce(
      (prevValue, currentValue) => prevValue + currentValue.itemQuantity,
      0,
    );
    setCartCounter(Number(totalCartItems));
  }, [cartCounter]);

  pageProps.cartCounter = cartCounter;

  pageProps.setCartCounter = setCartCounter;

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: 'Montserrat', sans-serif;
            /* background-color: white; */
            color: black;
          }

          a {
            color: black;
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
          }
        `}
        const
        divStyle={css``}
      />{' '}
      <AnimatePresence exitBeforeEnter>
        <Layout cartQuantity={Number(cartCounter)}>
          <Component {...pageProps} />
        </Layout>
      </AnimatePresence>
    </>
  );
}

export default MyApp;
