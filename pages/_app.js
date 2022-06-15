import { css, Global } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import { getParsedCookie } from '../util/cookies';

function MyApp({ Component, pageProps }) {
  const [cartCounter, setCartCounter] = useState(0);
  const [items, setItems] = useState();

  // if (typeof window !== 'undefined') {
  //   console.log('You are on the browser');
  //   // 👉️ can use localStorage here

  //   setItems(JSON.parse(localStorage.getItem('items')));
  // }

  useEffect(() => {
    const cookie = getParsedCookie('cart');
    let totalCartItems = 0;
    for (let i = 0; i < cookie.length; i++) {
      totalCartItems += Number(cookie[i].itemQuantity);
    }
    console.log('totalItems: ', totalCartItems);
    setCartCounter(totalCartItems);
  }, []);

  // I keep this here just in case...
  if (!pageProps) {
    pageProps = {};
  }

  useEffect(() => {
    const itemsData = localStorage.getItem('items');
    if (items) {
      setItems(itemsData);
    }
  }, []);

  pageProps.cartCounter = cartCounter;
  // pageProps.setItems = setItems;

  // pageProps.totalItems = totalItems;
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
        divStyle={css`
          /* background-color: red; */
        `}
      />{' '}
      <AnimatePresence exitBeforeEnter>
        <Layout>
          {}
          {/* <hr /> */}

          <Component {...pageProps} />
        </Layout>
      </AnimatePresence>
    </>
  );
}

export default MyApp;
