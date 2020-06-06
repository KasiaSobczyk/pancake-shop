import * as actions from '../actions/actions';

const PRICES = {
  butter: 1,
  strawberry: 2,
  chocolate: 2,
  iceCream: 3,
};

const initialState = {
  addIns: null,
  totalPrice: 0,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.INIT_ADDINS:
      return {
        ...state,
        addIns: action.addIns,
        error: false,
      };
    case actions.FETCH_ADDINS_FAILED:
      return {
        ...state,
        error: true,
      };
    case actions.ADD_ADDITIVE:
      return {
        ...state,
        addIns: {
          ...state.addIns,
          [action.name]: state.addIns[action.name] + 1,
        },
        totalPrice: state.totalPrice + PRICES[action.name],
      };
    case actions.REMOVE_ADDITIVE:
      return {
        ...state,
        addIns: {
          ...state.addIns,
          [action.addIns]: state.addIns[action.name] - 1,
        },
        totalPrice: state.totalPrice - PRICES[action.name],
      };
    default:
      return state;
  }
};

export default reducer;
