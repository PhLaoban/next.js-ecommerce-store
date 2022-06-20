import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTypewriter } from 'react-simple-typewriter';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import Footer from '../Components/Footer';

const frontPageDiv = css`
  flex-direction: row;
  background-color: #04090c;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 82vh;
  padding: 8%;
  display: flex;
  h1 {
    color: white;
    height: 5rem;
    max-width: fit-content;
    font-size: 2rem;
    font-weight: 100;

    letter-spacing: 12px;
  }

  #hello {
    font-size: 2rem;
    font-weight: 100;
  }

  p {
    color: white;
    font-size: 16px;
    margin-left: 1000px;
    margin-top: -280px;
    font-weight: 600;
    opacity: 0.9;
  }
`;

const headlineDiv = css`
  background-image: url('cups.jpg');

  background-size: cover;
  height: 580px;
`;

const coffeeplantImgDiv = css`
  display: flex;
  min-height: 70vh;
  max-width: 70%;

  font-size: 22px;
  justify-content: center;
  align-items: center;
  background-color: white;
  .paragraphCoffeeplant {
    margin-top: 0;

    padding: 0 10%;
    color: black;
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

export default function Home() {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  // function for typewriter effect

  const { text } = useTypewriter({
    words: ['Coffee', 'Club!'],
    loop: {},
  });

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x0,
          backgroundColor: 0xffffff,
        }),
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <motion.div initial="initial" animate="animate" variants={fadeInUp}>
      <Head>
        <title>Coffee Club</title>
        <meta name="description" content="E-Commerce Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <motion.div css={frontPageDiv}>
          <motion.div css={headlineDiv} variants={fadeInUp}>
            <h1 id="hello">Hello, </h1>
            <h1 id="hello">Welcome to: </h1>

            <br />
            <br />

            <h1> {text} </h1>

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
            {/* <Image
              id="img"
              src={galaxy}
              alt="coffeeplant"
              width={2400}
              height={1080}
            /> */}
          </div>
        </div>

        <div>
          <div className="latteartImg">
            {/* <Image id="img2" src={galaxy2} alt="latteart" /> */}
          </div>
        </div>
        <div ref={vantaRef} css={contactParagraph}>
          <p> Lets's talk about Coffee</p>
          <Link href="/contact">
            <button>Contact us</button>
          </Link>
        </div>
        <Footer />
      </main>
    </motion.div>
  );
}
