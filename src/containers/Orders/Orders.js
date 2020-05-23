import React, { Component } from 'react';
import SingleOrders from '../../components/Pancake/Order/SingleOrder/SingleOrder';
import styles from './Orders.module.css';
import withErrorHandler from '../../hoc/errorHandler/withErrorHandler';
import axios from '../../axios-conf';

class Orders extends Component {
  state = { orders: [], loading: true };
  componentDidMount() {
    axios
      .get('/orders.json')
      .then((res) => {
          console.log(res.data)
        let orders = [];
        for (let i in res.data) {
          orders.push({ ...res.data[i], id: i });
        }
        this.setState({ orders: orders, loading: false });
      })
      .catch((error) => this.setState({ loading: false }));
  }
  render() {
    return (
      <div className={styles.orders}>
        {this.state.orders.map((order) => (
          <SingleOrders addOns={order.addIns} totalPrice={order.price} key={order.id} />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
