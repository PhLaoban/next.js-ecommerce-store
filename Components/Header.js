import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  height: 50px;
  max-width: 1300px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;

  color: black;
  font-size: 20px;
`;

const rotationHeader = css`
  &:hover {
    cursor: pointer;

    transform: rotateX(340deg);
    transition: transform 0.8s;
  }
`;

export default function Header(props) {
  console.log('props from header', props);
  return (
    <header css={headerStyles}>
      <div css={rotationHeader}>
        <Link href="/coffeeshop">Products</Link>
      </div>

      <div css={rotationHeader}>
        <Link href="/">Home</Link>
      </div>
      <div css={rotationHeader}>
        <Link href="/cart">
          <div>Shopping Cart 🛒 {props.cartAmount} </div>
        </Link>
      </div>
    </header>
  );
}
