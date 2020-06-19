import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-conf';
import SingleOrders from '../../components/Pancake/Order/SingleOrder/SingleOrder';
import withErrorHandler from '../../hoc/errorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import styles from './Orders.module.css';
import Loader from '../../components/Utilities/Loader/Loader';

class Orders extends Component {
  componentDidMount() {
    this.props.onOrdersInit(this.props.token, this.props.id);
  }
  render() {
    let orders = <Loader />;
    if (!this.props.loading) {
      orders = (
        <div className={styles.orders}>
          {this.props.orders.map((order) => (
            <SingleOrders addOns={order.addIns} totalPrice={order.price} key={order.id} />
          ))}
        </div>
      );
    }
    return orders;
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.id,
    token: state.auth.token,
    orders: state.summary.orders,
    loading: state.summary.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrdersInit: (authToken, id) => dispatch(actions.orders(authToken, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
