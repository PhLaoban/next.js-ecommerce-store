import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import butfirst from '../public/butfirst.jpg';
import coffeeplant from '../public/coffeeplant.jpg';
import latteart from '../public/latteart.jpg';

const frontPageDiv = css`
  flex-direction: row;
  background-color: black;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80vh;
  padding: 0 10%;
  display: flex;
  h1 {
    color: white;
    height: 18rem;
    max-width: fit-content;
    font-size: 10rem;
    line-height: 10rem;
    white-space: pre-line;
    margin-top: -150px;
  }

  p {
    color: white;
    font-size: 20px;
    margin-left: 1000px;
    margin-top: -280px;
  }
`;

const coffeeplantImgDiv = css`
  display: flex;
  height: auto;
  width: auto;
  align-items: center;
  justify-content: space-evenly;
  padding-right: 207px;

  .paragraphCoffeeplant {
    font-size: 25px;
    width: 50%;
  }

  .coffeeplant {
    width: 500px;
  }
`;
const latteartImg = css`
  display: flex;
  height: auto;
  width: auto;
  align-items: center;
  justify-content: space-evenly;
  padding-left: 208px;
  margin-top: -5px;

  .paragraphlatteart {
    font-size: 25px;
    width: 50%;
  }
  .latteartImg {
    width: 500px;
  }
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Coffee Club</title>
        <meta name="description" content="E-Commerce Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <br />
        <br />
        <br />

        <div css={frontPageDiv}>
          <div>
            <h1>Coffee </h1>
            <h1>Club</h1>

            <div id="paragraph">
              <p>Full-Service and High Quality Products</p>
            </div>
          </div>
        </div>

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
            <Image id="img" src={coffeeplant} alt="coffeeplant" />
          </div>
        </div>

        <div css={latteartImg}>
          <div className="latteartImg">
            <Image src={latteart} alt="latteart" />
          </div>
          <div className="paragraphlatteart">
            <p>
              'Coffee Club' Coffee Roasters has been amongst the top coffee
              roasters in Austria for the last few years. We source, roast,
              supply and brew the top 5% of coffees from around the world.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
