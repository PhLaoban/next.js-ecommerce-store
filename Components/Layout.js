import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <div>
      <Header />
      {props.children}
      <div> </div>
      {/* <Footer /> */}
    </div>
  );
}
