import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Checkout from '../../components/Pancake/Order/Checkout/Checkout';
import ContactData from './ContactData/ContactData';

class Summary extends Component {
  submitCheckoutHandler = () => {
    this.props.history.replace('/contact');
  };

  goBackHandler = () => {
    this.props.history.goBack();
  };

  render() {
    let checkout = <Redirect to="/" />;
    if (this.props.addIns) {
      console.log('elo  ', this.props.ordered);
      const redirect = this.props.ordered ? <Redirect to="/" /> : null;
      checkout = (
        <div>
          {redirect}
          <Checkout
            addIns={this.props.addIns}
            cancelCheckout={this.goBackHandler}
            submitCheckout={this.submitCheckoutHandler}
          />
          <Route
            path={'/contact'}
            // render={(props) => (
            //   <ContactData {...props} totalPrice={this.props.price} addIns={this.props.addIns} />
            // )}
            component={ContactData}
          />
        </div>
      );
    }
    return checkout;
  }
}

const mapStateToProps = (state) => {
  return {
    addIns: state.pancake.addIns,
    ordered: state.summary.isOrdered,
  };
};

export default connect(mapStateToProps)(Summary);
