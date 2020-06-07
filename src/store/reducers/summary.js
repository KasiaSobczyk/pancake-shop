import * as actions from '../actions/actions';

const initialState = {
  orders: [],
  loading: false,
  isOrdered: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ORDER_INIT:
      return {
        ...state,
        isOrdered: false,
      };
    case actions.ORDER_SUCCESS:
      const order = { ...action.order, id: action.id };
      return {
        ...state,
        orders: state.orders.concat(order),
        loading: false,
        isOrdered: false,
      };
    case actions.ORDER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case actions.ORDER_START:
      return {
        ...state,
        loading: true,
      };
    case actions.ORDERS_INIT:
      return {
        ...state,
        loading: true,
      };
    case actions.ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case actions.ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
