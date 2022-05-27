import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import icon from '../public/icon.png';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  background-color: black;
  height: 100px;
  max-width: 1300px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;

  color: white;
  font-size: 20px;
  &:hover {
    cursor: pointer;
    transform: scale(1.04);
    transition: 0.5s ease-in-out;
  }
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      <Link href="/coffeeshop">Products</Link>
      <div>
        <Link href="/">Home</Link>
      </div>
      <Link href="/about">
        <Image src={icon} alt="icon" />
      </Link>
    </header>
  );
}
