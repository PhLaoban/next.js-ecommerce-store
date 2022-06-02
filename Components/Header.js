import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  background-color: white;
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

    transform: rotateX(360deg);
    transition: transform 1.2s;
    overflow: hidden;
  }
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      <div css={rotationHeader}>
        <Link href="/coffeeshop">Products</Link>
      </div>

      <div css={rotationHeader}>
        <Link href="/">Home</Link>
      </div>
      <div css={rotationHeader}>
        <Link href="/about">Shopping Cart</Link>
      </div>
    </header>
  );
}
