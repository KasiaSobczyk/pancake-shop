import * as actions from '../actions/actions';
import { updateObjHelper } from '../../shared/helper';

const initialState = {
  orders: [],
  loading: false,
  isOrdered: false,
};

const orderInit = (state, action) => {
  return updateObjHelper(state, { isOrdered: false });
};
const orderSuccess = (state, action) => {
  const order = updateObjHelper(action.order, { id: action.id });
  return updateObjHelper(state, {
    orders: state.orders.concat(order),
    loading: false,
    isOrdered: true,
  });
};
const orderFailure = (state, action) => {
  return updateObjHelper(state, { loading: false });
};
const orderStart = (state, action) => {
  return updateObjHelper(state, { loading: true });
};
const ordersInit = (state, action) => {
  return updateObjHelper(state, { loading: true });
};
const ordersSuccess = (state, action) => {
  return updateObjHelper(state, { orders: action.orders, loading: false });
};
const ordersFailure = (state, action) => {
  return updateObjHelper(state, { loading: false });
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
