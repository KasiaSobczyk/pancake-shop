import React, { Component } from 'react';
import axios from '../../axios-conf';
import Controls from '../../components/Pancake/Controls/Controls';
import Order from '../../components/Pancake/Order/Order';
import Pancake from '../../components/Pancake/Pancake';
import Loader from '../../components/Utilities/Loader/Loader';
import Modal from '../../components/Utilities/Modal/Modal';
import Aux from '../../hoc/AuxReact/react-aux';
import withErrorHandler from '../../hoc/errorHandler/withErrorHandler';
import styles from './PancakeCreator.module.css';

const PRICES = {
  chocolate: 2,
  iceCream: 3,
  butter: 1,
  strawberry: 2,
};

class PancakeCreator extends Component {
  state = {
    addIns: {
      chocolate: 0,
      iceCream: 0,
      butter: 0,
      strawberry: 0,
    },
    loading: false,
    isOrdrerd: false,
    isAdded: false,
    totalPrice: 5,
  };

  addProductHandler = (type) => {
    const ingredients = this.state.addIns[type];
    const amount = ingredients + 1;
    const updatedState = {
      ...this.state.addIns,
    };
    updatedState[type] = amount;
    const price = PRICES[type];
    const oldValue = this.state.totalPrice;
    const multiplyPrice = oldValue + price;
    this.setState({
      addIns: updatedState,
      totalPrice: multiplyPrice,
    });
    this.updateOrder(updatedState);
  };

  removeProductHandler = (type) => {
    const ingredients = this.state.addIns[type];
    if (ingredients === 0) {
      return;
    }
    const amount = ingredients - 1;
    const updatedState = {
      ...this.state.addIns,
    };
    updatedState[type] = amount;
    const price = PRICES[type];
    const oldValue = this.state.totalPrice;
    const multiplyPrice = oldValue - price;
    this.setState({
      addIns: updatedState,
      totalPrice: multiplyPrice,
    });
    this.updateOrder(updatedState);
  };

  orderHandler = () => {
    this.setState({ isOrdrerd: true });
  };

  cancelOrderHandler = () => {
    this.setState({ isOrdrerd: false });
  };

  submitOrderHandler = () => {
    this.setState({ loading: true });
    const completeOrder = {
      addIns: this.state.addIns,
      price: this.state.totalPrice,
      orderer: {
        name: 'John Doe',
        address: {
          street: '123 Main St',
          zipCode: '54341',
          country: 'USA',
        },
        email: 'john32423@gmail.com',
      },
      deliveryMethod: 'personal pickup',
    };
    axios
      .post('/orders.json', completeOrder)
      .then((res) => {
        this.setState({ loading: false, isOrdrerd: false });
      })
      .catch((err) => {
        this.setState({ loading: false, isOrdrerd: false });
      });
  };

  updateOrder(addIns) {
    const summary = Object.keys(addIns)
      .map((k) => {
        return addIns[k];
      })
      .reduce((arr, el) => {
        return arr + el;
      }, 0);

    this.setState({ isAdded: summary > 0 });
  }

  render() {
    const isDisabled = { ...this.state.addIns };
    let orderComponent = (
      <Order
        products={this.state.addIns}
        price={this.state.totalPrice}
        submitted={this.submitOrderHandler}
        canceled={this.cancelOrderHandler}
      />
    );
    if (this.state.loading) {
      orderComponent = <Loader />;
    }

    for (let k in isDisabled) {
      isDisabled[k] = isDisabled[k] === 0;
    }
    return (
      <Aux>
        <Modal appear={this.state.isOrdrerd} closed={this.cancelOrderHandler}>
          {orderComponent}
        </Modal>
        <div className={styles.pancakeLayout}>
          <div className={styles.col}>
            <Pancake addIns={this.state.addIns} />
          </div>
          <div className={styles.col_1}>
            <Controls
              price={this.state.totalPrice}
              disabled={isDisabled}
              addNew={this.addProductHandler}
              removeOne={this.removeProductHandler}
              isAdded={this.state.isAdded}
              ordered={this.orderHandler}
            />
          </div>
        </div>
      </Aux>
    );
  }
}

export default withErrorHandler(PancakeCreator, axios);
