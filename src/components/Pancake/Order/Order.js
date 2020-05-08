import React from 'react';

import Button from '../../Button/Button';
import Aux from '../../../hoc/react-aux';
const order = (props) => {
  const products = Object.keys(props.products).map((k) => {
    return (
      <li key={k}>
        <span style={{ textTransform: 'capitalize' }}>{k}</span>: {props.products[k]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your order</h3>
      <p>Choose your favourite add-ons</p>
      <ul>{products}</ul>
      <b>Total price: {props.price.toFixed(2)}</b>
      <p>Proceed to checkout</p>
      <Button class="danger" clicked={props.canceled}>
        CANCEL
      </Button>
      <Button class="success" clicked={props.submitted}>
        SUBMIT
      </Button>
    </Aux>
  );
};

export default order;
