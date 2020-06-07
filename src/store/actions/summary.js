import * as actions from './actions';
import axios from '../../axios-conf';

export const orderStart = () => {
  return {
    type: actions.ORDER_START,
  };
};

export const orderInit = () => {
  return {
    type: actions.ORDER_INIT,
  };
};

export const order = (data) => {
  return (dispatch) => {
    dispatch(orderStart());
    axios
      .post('/orders.json', data)
      .then((res) => {
        dispatch(orderSuccess(res.data.name, data));
      })
      .catch((err) => {
        dispatch(orderFailure());
      });
  };
};

export const orderSuccess = (id, order) => {
  return {
    type: actions.ORDER_SUCCESS,
    id: id,
    order: order,
  };
};

export const orderFailure = (err) => {
  return {
    type: actions.ORDER_FAILURE,
    error: err,
  };
};

export const ordersInit = () => {
  return {
    type: actions.ORDERS_INIT,
  };
};

export const orders = () => {
  return (dispatch) => {
    dispatch(ordersInit());
    axios
      .get('/orders.json')
      .then((res) => {
        let orders = [];
        for (let i in res.data) {
          orders.push({ ...res.data[i], id: i });
        }
        dispatch(ordersSuccess(orders));
      })
      .catch((error) => dispatch(ordersFailure(error)));
  };
};

export const ordersSuccess = (res) => {
  return {
    type: actions.ORDERS_SUCCESS,
    orders: res,
  };
};

export const ordersFailure = (err) => {
  return {
    type: actions.ORDERS_FAILURE,
    error: err,
  };
};
