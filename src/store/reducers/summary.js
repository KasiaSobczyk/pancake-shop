import * as actions from '../actions/actions';
import { reducerHelper } from '../helper';

const initialState = {
  orders: [],
  loading: false,
  isOrdered: false,
};

const orderInit = (state, action) => {
  return reducerHelper(state, { isOrdered: false });
};
const orderSuccess = (state, action) => {
  const order = reducerHelper(action.order, { id: action.id });
  return reducerHelper(state, {
    orders: state.orders.concat(order),
    loading: false,
    isOrdered: false,
  });
};
const orderFailure = (state, action) => {
  return reducerHelper(state, { loading: false });
};
const orderStart = (state, action) => {
  return reducerHelper(state, { loading: true });
};
const ordersInit = (state, action) => {
  return reducerHelper(state, { loading: true });
};
const ordersSuccess = (state, action) => {
  return reducerHelper(state, { orders: action.orders, loading: false });
};
const ordersFailure = (state, action) => {
  return reducerHelper(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ORDER_INIT: return orderInit(state, action);
    case actions.ORDER_SUCCESS: return orderSuccess(state, action);
    case actions.ORDER_FAILURE: return orderFailure(state, action);
    case actions.ORDER_START: return orderStart(state, action);
    case actions.ORDERS_INIT: return ordersInit(state, action);
    case actions.ORDERS_SUCCESS: return ordersSuccess(state, action);
    case actions.ORDERS_FAILURE: return ordersFailure(state, action);
    default: return state;
  }
};

export default reducer;
