import React, { Component } from 'react';

import Aux from '../../hoc/react-aux';
import Modal from '../../components/Modal/Modal';
import Pancake from '../../components/Pancake/Pancake';
import styles from './PancakeCreator.module.css';
import Controls from '../../components/Pancake/Controls/Controls';
import Order from '../../components/Pancake/Order/Order';

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
    for (let k in isDisabled) {
      isDisabled[k] = isDisabled[k] === 0;
    }
    return (
      <Aux>
        <Modal appear={this.state.isOrdrerd} closed={this.cancelOrderHandler}>
          <Order products={this.state.addIns} />
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

export default PancakeCreator;
