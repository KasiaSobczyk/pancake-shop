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

export const order = (data, token) => {
  return (dispatch) => {
    dispatch(orderStart());
    axios
      .post('/orders.json?auth=' + token, data)
      .then((res) => {
        console.log("id  ", res.data.id)
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

export const orders = (token, id) => {
  return (dispatch) => {
    dispatch(ordersInit());
    const queryParam = '?auth=' + token + '&orderBy="id"&equalTo="' + id + '"';
    axios
      .get('/orders.json' + queryParam)
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
