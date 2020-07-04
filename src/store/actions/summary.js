import * as actions from './actions';

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
  return {
    type: actions.ORDER,
    data: data,
    token: token,
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
  return {
    type: actions.ORDERS,
    token: token,
    id: id,
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
