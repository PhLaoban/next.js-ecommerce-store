import { css } from '@emotion/react';
import { filterProps } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

    transform: rotateX(360deg);
    transition: transform 1.2s;
    overflow: hidden;
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
        <Link href="/about">
          <div>Shopping Cart 🛒 {props.amount} </div>
        </Link>

        <Link href="/about">
          <div> </div>
        </Link>
      </div>
    </header>
  );
}
