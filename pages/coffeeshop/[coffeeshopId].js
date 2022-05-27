import { css } from '@emotion/react';
import Image from 'next/image';
import { coffeeDatabase } from '../../util/database';

const singleProduct = css`
  display: flex;
  height: 800px;
  width: 1000px;
  align-items: center;
  margin: auto;
  justify-content: space-between;
`;

const imgStyle = css`
  border-radius: 10px;
  margin-bottom: 1000px;
`;

export default function Coffeeshop(props) {
  // const router = useRouter();
  // const { coffeeId } = router.query;

  return (
    <div css={singleProduct}>
      <Image css={imgStyle} src={props.coffee.image} width="450" height="600" />{' '}
      <div>
        {props.coffee.description} | {props.coffee.taste}
        <br />
        {props.coffee.name}: € {props.coffee.price}0
      </div>
    </div>
  );
}

export function getServerSideProps(context) {
  const coffees = coffeeDatabase.find((coffee) => {
    return coffee.id === context.query.coffeeshopId;
  });
  return {
    props: {
      coffee: coffees || null,
    },
  };
}
