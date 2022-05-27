import { css } from '@emotion/react';
import Link from 'next/link';
import Header from './Header';

export default function Layout(props) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}
