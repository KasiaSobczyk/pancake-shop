import React, { Component } from 'react';

import Button from '../../Utilities/Button/Button';
import Aux from '../../../hoc/AuxReact/react-aux';
class Order extends Component {
  componentWillUpdate() {
    console.log("elo")
  }

  render() {
    const products = Object.keys(this.props.products).map((k) => {
      return (
        <li key={k}>
          <span style={{ textTransform: 'capitalize' }}>{k}</span>: {this.props.products[k]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your order</h3>
        <p>Choose your favourite add-ons</p>
        <ul>{products}</ul>
        <b>Total price: {this.props.price.toFixed(2)}</b>
        <p>Proceed to checkout</p>
        <Button class="danger" clicked={this.props.canceled}>
          CANCEL
        </Button>
        <Button class="success" clicked={this.props.submitted}>
          SUBMIT
        </Button>
      </Aux>
    );
  }
}

export default Order;
