import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import galaxy from '../public/galaxy.jpg';
import galaxy2 from '../public/galaxy2.jpg';

const frontPageDiv = css`
  flex-direction: row;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80vh;
  padding: 0 10%;
  display: flex;
  h1 {
    padding-top: 50px;
    color: Black;
    height: 18rem;
    max-width: fit-content;
    font-size: 10rem;
    line-height: 10rem;
    white-space: pre-line;
    margin-top: -150px;
  }

  p {
    color: black;
    font-size: 20px;
    margin-left: 1000px;
    margin-top: -280px;
  }
`;

const coffeeplantImgDiv = css`
  display: flex;
  height: 270px;
  width: auto;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  .paragraphCoffeeplant {
    margin-top: 0;
    /* width: 50vw; */
    padding: 0 10%;
    color: black;
  }
  #img {
    filter: brightness(1.7);
    height: auto;
  }
`;
const latteartImg = css`
  display: flex;
  height: 450px;
  width: auto;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  background-color: white;

  .paragraphlatteart {
    margin-top: 0;
    /* width: 50vw; */
    padding: 0 10%;
    color: black;
  }
  #img2 {
    filter: brightness(1.2);
    height: auto;
  }
`;

const contactParagraph = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 400px;
  flex-direction: column;

  p {
    font-size: 30px;
    padding: 40px;
  }
  button {
    cursor: pointer;
    border-radius: 10rem;
    height: 57px;
    width: 12rem;
    font-size: 19px;
    font-weight: 20;
    border-color: grey;
    background-color: black;
    color: white;
    border-style: solid;
    border-width: 1px;
  }
`;

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: -20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.8,
      ease: easing,
    },
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.8,
    },
  },
};

export default function Home() {
  return (
    <motion.div
      onDragEnter={{ opacity: 0 }}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <Head>
        <title>Coffee Club</title>
        <meta name="description" content="E-Commerce Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <motion.div variants={stagger} css={frontPageDiv}>
          <motion.div variants={fadeInUp}>
            <h1>Coffee </h1>
            <h1>Club</h1>

            <div id="paragraph">
              <p>Full-Service and High Quality Products</p>
            </div>
          </motion.div>
        </motion.div>

        <div css={coffeeplantImgDiv}>
          <div className="paragraphCoffeeplant">
            <p>
              Our focus is on small batch roasting of Specialty Grade coffee.
              Our coffees are roasted to enhance and highlight the array of
              flavor possibilities and to reflect the hard work of the farmers
              that we work
            </p>
          </div>

          <div className="coffeeplant">
            <Image id="img" src={galaxy} alt="coffeeplant" />
          </div>
        </div>

        <div css={latteartImg}>
          <div className="latteartImg">
            <Image id="img2" src={galaxy2} alt="latteart" />
          </div>
          <div className="paragraphlatteart">
            <p>
              'Coffee Club' Coffee Roasters has been amongst the top coffee
              roasters in Austria for the last few years. We source, roast,
              supply and brew the top 5% of coffees from around the world.
            </p>
          </div>
        </div>
        <div css={contactParagraph}>
          <p> Lets's talk about Coffee</p>
          <button>Contact us</button>
        </div>
      </main>
    </motion.div>
  );
}
