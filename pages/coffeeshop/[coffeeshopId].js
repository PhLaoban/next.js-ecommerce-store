import { css } from '@emotion/react';
import { animate, motion } from 'framer-motion';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Layout from '../../Components/Layout';
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

  .add {
    padding: 6px;
    margin: 8px 16px;
    height: 24px;
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;

    /* border: 1px solid #282828; */
    cursor: pointer;
    margin-top: 50px;
    margin-bottom: 30px;

    &:hover {
      transition: 1 ease;
      border-bottom: 1px solid #333;
      border-color: black;
    }
    &:active {
      transform: translateX(2px) translateY(-2.5px);
    }
  }
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

const itemDescription = css`
  display: flex;
  align-items: flex-start;
  padding: 50px;
  justify-content: space-between;
  flex-direction: column;
  color: black;

  .nextPreviousDiv {
    width: 500px;
    height: fit-content;
    display: flex;
    flex-direction: row;
    border-radius: 20px;
    padding-bottom: 20px;
    .nextPreviousButton {
      font-size: 15px;
      padding: 20px;
      padding-right: 80px;
      background-color: white;
      color: black;
      margin-left: -20px;
      text-decoration: underline;
      text-decoration-color: black;
      -webkit-transition-duration: 0.4s;
      transition-duration: 0.4s;
      text-decoration: none;
      overflow: hidden;
      cursor: pointer;

      &:hover {
        transition: 0.4s ease-in-out;
        opacity: 0.8;
        transform: scale(1.05);
      }
      &:active {
        transform: translateX(2px) translateY(-2.5px);
      }
    }
  }
`;

const coffeeName = css`
  font-size: 25px;
  font-weight: 500;
  border-bottom: 1px solid #333;
  border-color: black;
`;

const buttonStyle = css`
  cursor: pointer;
  border: none;
  border-radius: 8px;
  height: 48px;
  padding: 0 48px;
  font-size: 0.875rem;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.06rem;
  width: auto;

  background: #2d89fa;
  color: #fff;
  margin-right: 24px;
  &:hover {
    transition: 0.9 ease-in-out;
    background-color: #002ead;
  }
  &:active {
    transform: translateX(2px) translateY(-2.5px);
  }
`;

const inputField = css`
  font-family: inherit;
  width: 60%;
  border: 0;
  border-radius: 2px;
  outline: 0;
  padding-top: 30px;
  font-size: 1.3rem;
  /* color: $white; */
  background-color: rgba(45, 137, 250, 0.3);
  opacity: 0.5;
  padding: 7px 0;
  transition: border-color 0.2s;
  /* background: transparent; */
  /*
  &::placeholder {
    color: black;
    opacity: 1.5;
  } */

  /* &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  } */
`;

export default function Coffeeshop(props) {
  // const router = useRouter();
  // const { coffeeId } = router.query;

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const amountInputField = useRef(null);
  // const handleSubmit = (event) => {
  //   console.log('handleSubmit ran');
  //   event.preventDefault(); // 👈️ prevent page refresh

  //   // 👇️ clear all input values in the form
  //   setSelectedQuantity('');
  // };

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
        <div className="nextPreviousDiv">
          <Link
            id="previousButton"
            href={`/coffeeshop/${Number(props.coffee.id) - 1}`}
          >
            <div className="nextPreviousButton"> Previous Item</div>
          </Link>
          <Link href={`/coffeeshop/${Number(props.coffee.id) + 1}`}>
            <div className="nextPreviousButton">Next Item</div>
          </Link>
        </div>
        <div css={coffeeName}>
          {props.coffee.name}: € {props.coffee.price}
        </div>
        <br />
        {props.coffee.description}
        <br /> {props.coffee.taste}
        <motion.div css={divButton}>
          <br />
        </motion.div>
        <br />
        <label>
          Amount:
          <br />
          <input
            placeholder="0"
            css={inputField}
            value={selectedQuantity}
            onChange={(event) => {
              setSelectedQuantity(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <br />
        <div>
          <button
            className="button"
            css={buttonStyle}
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
                console.log(
                  'The item is already in the cart, updating quantity',
                );
                console.log('carts now: ', currentCart);
                setStringifiedCookie('cart', currentCart);
                props.setCartCounter(
                  props.cartCounter + Number(selectedQuantity),
                );
              } else {
                const updatedCart = [
                  ...currentCart,
                  {
                    id: props.coffee.id,

                    itemQuantity: selectedQuantity,
                  },
                ];
                setStringifiedCookie('cart', updatedCart);
                console.log('The cart is: ', updatedCart);

                props.setCartCounter(
                  props.cartCounter + Number(amountInputField.current?.value),
                );
              }
              setSelectedQuantity(1);
            }}
          >
            Add to cart
          </button>
        </div>
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
