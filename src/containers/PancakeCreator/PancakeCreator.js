import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-conf';
import Controls from '../../components/Pancake/Controls/Controls';
import Order from '../../components/Pancake/Order/Order';
import Pancake from '../../components/Pancake/Pancake';
import Loader from '../../components/Utilities/Loader/Loader';
import Modal from '../../components/Utilities/Modal/Modal';
import Aux from '../../hoc/AuxReact/react-aux';
import withErrorHandler from '../../hoc/errorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import styles from './PancakeCreator.module.css';

class PancakeCreator extends Component {
  state = {
    isOrdrerd: false,
  };

  componentDidMount() {
    console.log(this.props);
    this.props.onAddInsSet();
    // axios
    //   .get('https://pancake-shop.firebaseio.com/addIns.json')
    //   .then((res) => this.setState({ addIns: res.data }))
    //   .catch((err) => {
    //     this.setState({ error: true });
    //   });
  }

  orderHandler = () => {
    if (this.props.isAuth) {
      this.setState({ isOrdrerd: true });
    } else {
      this.props.onSetPath('/checkout')
      this.props.history.push('/auth');
    }
  };

  cancelOrderHandler = () => {
    this.setState({ isOrdrerd: false });
  };

  submitOrderHandler = () => {
    this.props.onCheckoutInit();
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
    let pancake = this.props.error ? <h3>No available ingredients</h3> : <Loader />;
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
              isAuth={this.props.isAuth}
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
    // if (this.state.loading) {
    //   orderComponent = <Loader />;
    // }

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
    onAddInsSet: () => dispatch(actions.fetchAddIns()),
    onAddInsAdded: (name) => dispatch(actions.addAdditive(name)),
    onAddInsDeleted: (name) => dispatch(actions.removeAdditive(name)),
    onSetPath: (path) => dispatch(actions.setRedirect(path)),
    onCheckoutInit: () => dispatch(actions.orderInit()),
  };
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
    addIns: state.pancake.addIns,
    totalPrice: state.pancake.totalPrice,
    error: state.pancake.error,
    ordered: state.summary.ordered,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(PancakeCreator, axios));
