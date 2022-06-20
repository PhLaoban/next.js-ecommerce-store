import Header from './Header';

export default function Layout(props) {
  console.log('props from layout', props);

  return (
    <div>
      <Header cartAmount={props.cartQuantity} />

      {props.children}

      <div> </div>
    </div>
  );
}
