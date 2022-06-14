import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import contact from '../public/contact.jpg';

const mainDiv = css`
  display: flex;
  justify-content: center;
  width: auto;
  height: auto;

  .wrapperImg {
    display: flex;
    justify-content: center;
    position: absolute;
    z-index: 1;
  }

  #imgDiv {
    width: 1400px;
    height: auto;
    #img {
      border-radius: 10px;
    }
  }

  #headline {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    font-size: 60px;
    height: 500px;
    width: 500px;
    position: absolute;
    flex-direction: column;
    z-index: 2;

    padding-right: 1300px;
    h1 {
      opacity: 0.8;
    }

    p {
      font-size: 20px;
      margin-bottom: 20px;
      opacity: 0.7;
    }
  }
`;

export default function About() {
  // const mailtoHref =
  //   'mailto:philippanton@coffeeclub.com?subject=SendMail&body=Description';

  return (
    <div>
      <Head>E-Commerce Store </Head>
      <div css={mainDiv}>
        <div id="headline">
          <h1>Contact us </h1>
          <a href="mailto:someone@yoursite.com">
            <p>philippanton@coffeeclub.com Markhofgasse 19/24, 1030 Wien</p>
          </a>

          <p>+4315689220</p>
        </div>

        <div className="wrapperImg">
          <div id="imgDiv">
            <Image id="img" src={contact} />
          </div>
        </div>
      </div>
    </div>
  );
}
