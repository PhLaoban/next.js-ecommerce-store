import { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  const [items, setItems] = useState();

  useEffect(() => {
    const itemsData = JSON.parse(localStorage.getItem('items'));
    if (items) {
      setItems(itemsData);
    }
  }, []);

  console.log('props from layout', props);

  return (
    <div>
      <Header amount={props.cartQuantity} />
      {props.children}

      <div> </div>
      {/* <Footer /> */}
    </div>
  );
}
