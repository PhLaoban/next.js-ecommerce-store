import { css, Global } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import Layout from '../Components/Layout';

function MyApp({ Component, pageProps }) {
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
