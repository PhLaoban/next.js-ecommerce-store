import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import icon from '../public/icon.png';

const footerstyles = css`
  display: flex;
  bottom: 0;
  justify-content: space-between;
  height: 100px;
  max-width: 1300px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
`;

const rotationFooter = css`
  &:hover {
    cursor: pointer;

    transform: rotateX(360deg);
    transition: transform 1s;
  }
`;

export default function Footer() {
  return (
    <footer css={footerstyles}>
      <div css={rotationFooter}>
        <Link href="/coffeeshop">Products</Link>
      </div>

      <div css={rotationFooter}>
        <Link href="/">About</Link>
      </div>
      <div css={rotationFooter}>©2022</div>
    </footer>
  );
}
