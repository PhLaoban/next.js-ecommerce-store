import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getCoffees } from '../util/database';

const imagesDiv = css`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(3, auto);
  height: auto;
  width: auto;
  justify-content: center;
  background-color: white;
`;

const productNames = css`
  padding: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 17px;
  padding: 2px;
  border-color: white;
  border-radius: 50px;
  border-width: 0.5px;
  border-bottom: 100px;
  width: 180px;
  margin-top: 30px;
  margin-left: 80px;
  background: #ca4246;
  font-weight: 600;
    background-color: #ca4246;
    background: conic-gradient(
      #ca4246 16.666%,
      #e16541 16.666%,
      #e16541 33.333%,
      #f18f43 33.333%,
      #f18f43 50%,
      #8b9862 50%,
      #8b9862 66.666%,
      #476098 66.666%,
      #476098 83.333%,
      #a7489b 83.333%
    );

    /* Set thee background size and repeat properties. */
    background-size: 57%;
    background-repeat: repeat;

    /* Use the text as a mask for the background. */
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
`;

const imageStyle = css`
  padding: 50px;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: 0.4s ease-in-out;
    opacity: 0.8;
  }
`;

const headline = css`
  justify-content: center;
  padding: 50px;
  font-size: 40px;
  background-color: white;

  h1 {
    background: #ca4246;
    background-color: #ca4246;
    background: conic-gradient(
      #ca4246 16.666%,
      #e16541 16.666%,
      #e16541 33.333%,
      #f18f43 33.333%,
      #f18f43 50%,
      #8b9862 50%,
      #8b9862 66.666%,
      #476098 66.666%,
      #476098 83.333%,
      #a7489b 83.333%
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
  h1:hover {
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
  p {
    font-size: 20px;
    font-style: inherit;
    letter-spacing: 2px;
    padding: 50px;
    color: grey;
  }
`;
const easing = [0.6, -0.05, 0.01, 0.99];

export default function Shop(props) {
  return (
    <motion.div css={imagesDiv} initial="initial" animate="animate">
      {' '}
      <Head>
        <title>Coffee Club</title>
        <meta name="description" content="List of various Coffee Blends" />
      </Head>
      <div css={headline}>
        <h1>BUY YOUR COFFEE ONLINE</h1>

        <p>
          Different regions, the various types of harvesting and processing of
          raw beans, millions of possible blending ratios and the method of
          roasting lead to an almost endless variety of flavors and types of
          quality.
        </p>
      </div>
      <motion.div variants={props.stagger} css={imagesDiv}>
        {props.coffees.map((coffee) => {
          return (
            <motion.div variants={props.fadeInUp} key={`coffee-${coffee.id}`}>
              <Link
                href={`/coffeeshop/${coffee.id}`}
                key={`items-coffees-${coffee.id}`}
              >
                <div>
                  <Image
                    css={imageStyle}
                    src={`/images/${coffee.name}.webp`}
                    width="450"
                    height="600"
                  />
                </div>
              </Link>

              <br />
              <div css={productNames}>
                <Link href={`/coffeeshop/${coffee.id}`}>{coffee.name}</Link>
              </div>

              <br />
              <br />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export async function getServerSideProps() {
  const coffees = await getCoffees();

  const fadeInUp = {
    initial: {
      y: 60,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 2,
        ease: easing,
      },
    },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  console.log(coffees);

  return {
    // Anything that you pass in the props
    // object will get passed to the component
    // at the top in the `props` parameter
    props: {
      coffees: coffees,
      stagger,
      fadeInUp,
      easing,
    },
  };
}
