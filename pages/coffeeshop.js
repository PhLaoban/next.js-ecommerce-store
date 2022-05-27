import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { coffeeDatabase } from '../util/database';

const imagesDiv = css`
  display: flex;

  max-height: 500px;
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

const productNames = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 17px;
`;

const imageStyle = css`
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: 0.5s ease-in-out;
  }
`;

export default function Shop(props) {
  return (
    <div>
      <Head>
        <title>Coffee Club</title>
        <meta name="description" content="List of various Coffee Blends" />
      </Head>
      <div css={imagesDiv}>
        {props.coffees.map((coffee) => {
          return (
            <div key={`coffee-${coffee.id}`}>
              <Link href={`/coffeeshop/${coffee.id}`}>
                <Image
                  css={imageStyle}
                  src={coffee.image}
                  width="450"
                  height="600"
                />
              </Link>
              <br />
              <div css={productNames}>
                <Link href={`/coffeeshop/${coffee.id}`}>{coffee.name}</Link>
              </div>

              <br />
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function getServerSideProps() {
  return {
    // Anything that you pass in the props
    // object will get passed to the component
    // at the top in the `props` parameter
    props: {
      coffees: coffeeDatabase,
    },
  };
}
