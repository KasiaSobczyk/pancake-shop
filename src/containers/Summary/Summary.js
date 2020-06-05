import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Checkout from '../../components/Pancake/Order/Checkout/Checkout';
import ContactData from './ContactData/ContactData';

class Summary extends Component {
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
          addIns={this.props.addIns}
          cancelCheckout={this.cancelCheckoutHandler}
          submitCheckout={this.submitCheckoutHandler}
        />
        {/* <Route path={this.props.match.path + '/contact'} component={ContactData} /> */}
        <Route
          path={this.props.match.path + '/contact'}
          // render={(props) => (
          //   <ContactData {...props} totalPrice={this.props.price} addIns={this.props.addIns} />
          // )}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addIns: state.addIns,
  };
};

export default connect(mapStateToProps)(Summary);
