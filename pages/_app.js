import { css, Global } from '@emotion/react';
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
            background-color: black;
            color: white;
          }

          a {
            color: White;
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
          }
        `}
        const
        divStyle={css`
          background-color: red;
        `}
      />{' '}
      <Layout>
        {}
        {/* <hr /> */}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
