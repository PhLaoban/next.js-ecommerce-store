import { css } from '@emotion/react';
import { animate, motion } from 'framer-motion';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies';
import { getSingleCoffee } from '../../util/database';

const singleProduct = css`
  display: flex;
  height: auto;
  width: auto;
  align-items: center;
  margin: auto;
  justify-content: center;
  background-color: white;
`;

const imgStyle = css`
  border-radius: 10px;
  margin-bottom: 1000px;
  height: 600px;
  width: 450px;
`;

const easing = [0.8, -0.09, 0.2, 0.8];

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: easing,
    },
  },
};
const divButton = css`
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;
const nextButton = css`
  border-radius: 20px;
  background-color: white;
  color: black;
  border-style: solid;
  border-color: white;
  text-decoration: underline;
  text-decoration-color: black;

  &:hover {
    background-color: #ddd;
    color: black;
    transition: 0.4s ease-in-out;
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const itemDescription = css`
  display: flex;
  align-items: flex-start;
  padding: 50px;
  justify-content: space-between;
  flex-direction: column;
  color: black;
`;

const coffeeName = css`
  font-size: 25px;
  font-weight: 500;
`;

const buttonNext = css`
  font-size: 12px;
  margin-top: 20px;
  width: fit-content;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 20px black(0);
    transition: 0.4s ease-in-out;
    opacity: 0.8;
  }
`;
const buttonPrevious = css`
  font-size: 12px;
  width: fit-content;
  display: flex;
  margin-bottom: 20px;
  width: 30px;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 20px black(0);
    transition: 0.4s ease-in-out;
    opacity: 0.8;
  }
`;

export default function Coffeeshop(props) {
  // const router = useRouter();
  // const { coffeeId } = router.query;

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const link = parseInt(props.coffee.id);

  if (!props.coffee) {
    return (
      <div>
        <Head>
          <title>Page not found</title>
          <meta
            name="description"
            content="Unfortunately, we have had trouble locating the product you are looking for."
          />
        </Head>

        <h2>This is not the Item you are looking for</h2>
      </div>
    );
  }

  return (
    <motion.div
      onDragEnter={{ opacity: 0 }}
      initial="initial"
      animate="animate"
      css={singleProduct}
    >
      <motion.div variants={fadeInUp}>
        <Image
          variants={fadeInUp}
          css={imgStyle}
          src={props.coffee.image}
          width="450"
          height="600"
        />{' '}
      </motion.div>

      <motion.div css={itemDescription} variants={fadeInUp}>
        <Link id="previousButton" href={`/coffeeshop/${link - 1}`}>
          <motion.div css={buttonPrevious}>Previous Item</motion.div>
        </Link>
        <div css={coffeeName}>
          {props.coffee.name}: € {props.coffee.price}0
        </div>
        <br />
        {props.coffee.description}
        <br /> {props.coffee.taste}
        <motion.div css={divButton}>
          <Link css={nextButton} href={`/coffeeshop/${link + 1}`}>
            <motion.div css={buttonNext}>Next Item</motion.div>
          </Link>
        </motion.div>
        <br />
        <br />
        <label>
          Amount
          <input
            onChange={(event) => {
              setSelectedQuantity(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <br />
        <button
          onClick={() => {
            const currentCart = getParsedCookie('cart')
              ? getParsedCookie('cart')
              : [];
            console.log('The cart is: ', currentCart);
            console.log(currentCart.length);

            const selectedItem = currentCart.find(
              (item) => item.id === props.coffee.id,
            );

            if (selectedItem) {
              selectedItem.itemQuantity =
                Number(selectedItem.itemQuantity) + Number(selectedQuantity);
              console.log('The item is already in the cart, updating quantity');
              console.log('carts now: ', currentCart);
              setStringifiedCookie('cart', currentCart);
            } else {
              const updatedCart = [
                ...currentCart,
                {
                  id: props.coffee.id,

                  itemQuantity: selectedQuantity,
                },
              ];
              setStringifiedCookie('cart', updatedCart);
              // props.setCartCounter(props.cartCounter + 1);
              console.log('The cart is: ', updatedCart);
            }
          }}
        >
          Add to cart
        </button>
      </motion.div>
    </motion.div>
  );
}

export async function getServerSideProps(context) {
  console.log(context.req.cookies.cart);

  // 2.get the id from the url and use it to match the single coffee id
  const coffees = await getSingleCoffee(context.query.coffeeshopId);

  if (!coffees) {
    context.res.StatusCode = 404;
  }

  console.log(coffees);

  return {
    props: {
      coffee: coffees || null,
    },
  };
}
