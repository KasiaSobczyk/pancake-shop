import React from 'react';
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
      <button>CANCEL</button>
      <button>SUBMIT</button>
    </Aux>
  );
};

export default order;
