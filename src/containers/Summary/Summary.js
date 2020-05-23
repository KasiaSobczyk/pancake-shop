import React, { Component } from 'react';
import Checkout from '../../components/Pancake/Order/Checkout/Checkout';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Summary extends Component {
  state = {
    addIns: null,
    price: 0,
  };

  componentWillMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    let sum = 0;
    const addIns = {};

    for (let i of queryParams.entries()) {
      if (i[0] === 'price') {
        sum = +i[1];
      } else {
        addIns[i[0]] = +i[1];
      }
    }
    this.setState({
      addIns: addIns,
      price: sum,
    });
  }

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  submitCheckoutHandler = () => {
    this.props.history.replace('/checkout/contact');
  };

  render() {
    return (
      <div>
        <Checkout
          addIns={this.state.addIns}
          cancelCheckout={this.cancelCheckoutHandler}
          submitCheckout={this.submitCheckoutHandler}
        />
        {/* <Route path={this.props.match.path + '/contact'} component={ContactData} /> */}
        <Route
          path={this.props.match.path + '/contact'}
          render={(props) => <ContactData {...props} totalPrice={this.state.price} addIns={this.state.addIns} />}
        />
      </div>
    );
  }
}

export default Summary;
