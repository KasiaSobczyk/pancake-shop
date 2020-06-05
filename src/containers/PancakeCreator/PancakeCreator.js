import React, { Component } from 'react';
import { connect } from 'react-redux';
import Controls from '../../components/Pancake/Controls/Controls';
import Order from '../../components/Pancake/Order/Order';
import Pancake from '../../components/Pancake/Pancake';
import Loader from '../../components/Utilities/Loader/Loader';
import Modal from '../../components/Utilities/Modal/Modal';
import Aux from '../../hoc/AuxReact/react-aux';
import withErrorHandler from '../../hoc/errorHandler/withErrorHandler';
import styles from './PancakeCreator.module.css';
import axios from '../../axios-conf';
import * as actions from '../../store/actions';

class PancakeCreator extends Component {
  state = {
    loading: false,
    error: null,
    isOrdrerd: false,
  };

  componentDidMount() {
    // console.log(this.props);
    // axios
    //   .get('https://pancake-shop.firebaseio.com/addIns.json')
    //   .then((res) => this.setState({ addIns: res.data }))
    //   .catch((err) => {
    //     this.setState({ error: true });
    //   });
  }

  orderHandler = () => {
    this.setState({ isOrdrerd: true });
  };

  cancelOrderHandler = () => {
    this.setState({ isOrdrerd: false });
  };

  submitOrderHandler = () => {
    this.props.history.push('/checkout');
  };

  updateOrder(addIns) {
    const summary = Object.keys(addIns)
      .map((k) => {
        return addIns[k];
      })
      .reduce((arr, el) => {
        return arr + el;
      }, 0);

    return summary > 0;
  }

  render() {
    const isDisabled = { ...this.props.addIns };
    let pancake = this.state.error ? <h3>No available ingredients</h3> : <Loader />;
    let orderComponent = null;

    if (this.props.addIns) {
      pancake = (
        <div className={styles.pancakeLayout}>
          <div className={styles.col}>
            <Pancake addIns={this.props.addIns} />
          </div>
          <div className={styles.col_1}>
            <Controls
              price={this.props.totalPrice}
              disabled={isDisabled}
              addNew={this.props.onAddInsAdded}
              removeOne={this.props.onAddInsDeleted}
              isAdded={this.updateOrder(this.props.addIns)}
              ordered={this.orderHandler}
            />
          </div>
        </div>
      );
      orderComponent = (
        <Order
          products={this.props.addIns}
          price={this.props.totalPrice}
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

const mapDispatchToProps = (dispatch) => {
  return {
    onAddInsAdded: (name) => dispatch({ type: actions.ADD_ADDITIVE, name: name }),
    onAddInsDeleted: (name) => dispatch({ type: actions.REMOVE_ADDITIVE, name: name }),
  };
};
const mapStateToProps = (state) => {
  return {
    addIns: state.addIns,
    totalPrice: state.totalPrice,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(PancakeCreator, axios));
