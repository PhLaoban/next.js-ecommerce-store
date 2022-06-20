import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const mainDiv = css`
  padding: 50px;
  font-size: 40px;
  background-color: white;
  p {
    cursor: pointer;
  }

  h1 {
    background: #ca4246;
    background-color: #ca4246;
    background: conic-gradient(
      #ca4246 16.666%,
      #e16541 16.666%,
      #e16541 33.333%,
      #f18f43 75.333%,
      #f18f43 70%,
      #8b9862 70%,
      #8b9862 66.666%,
      #476098 80.666%,
      #476098 60.333%,
      #a7489b 80.333%
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
`;

export default function About() {
  // const mailtoHref =
  //   'mailto:philippanton@coffeeclub.com?subject=SendMail&body=Description';

  return (
    <div>
      <Head>E-Commerce Store </Head>
      <div css={mainDiv}>
        <h1>Thank You for your order!!</h1>
        <Link href="/">
          <p>Go back to Home page</p>
        </Link>
      </div>
    </div>
  );
}
