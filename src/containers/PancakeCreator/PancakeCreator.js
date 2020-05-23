import React, { Component } from 'react';
import Controls from '../../components/Pancake/Controls/Controls';
import Order from '../../components/Pancake/Order/Order';
import Pancake from '../../components/Pancake/Pancake';
import Loader from '../../components/Utilities/Loader/Loader';
import Modal from '../../components/Utilities/Modal/Modal';
import Aux from '../../hoc/AuxReact/react-aux';
import withErrorHandler from '../../hoc/errorHandler/withErrorHandler';
import styles from './PancakeCreator.module.css';
import axios from '../../axios-conf';

const PRICES = {
  chocolate: 2,
  iceCream: 3,
  butter: 1,
  strawberry: 2,
};

class PancakeCreator extends Component {
  state = {
    addIns: null,
    loading: false,
    error: null,
    isOrdrerd: false,
    isAdded: false,
    totalPrice: 5,
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get('https://pancake-shop.firebaseio.com/addIns.json')
      .then((res) => this.setState({ addIns: res.data }))
      .catch((err) => {
        this.setState({ error: true });
      });
  }

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
    const params = [];
    for (let i in this.state.addIns) {
      params.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.addIns[i]));
    }
    params.push('price=' + this.state.totalPrice);
    const queryParams = params.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams,
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
    let pancake = this.state.error ? <h3>No available ingredients</h3> : <Loader />;
    let orderComponent = null;

    if (this.state.addIns) {
      pancake = (
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
      );
      orderComponent = (
        <Order
          products={this.state.addIns}
          price={this.state.totalPrice}
          submitted={this.submitOrderHandler}
          canceled={this.cancelOrderHandler}
        />
      );
    }
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
        {pancake}
      </Aux>
    );
  }
}

export default withErrorHandler(PancakeCreator, axios);
