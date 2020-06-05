import * as actions from './actions';

const PRICES = {
  butter: 1,
  strawberry: 2,
  chocolate: 2,
  iceCream: 3,
};

const initialState = {
  addIns: {
    butter: 0,
    strawberry: 0,
    chocolate: 0,
    iceCream: 0,
  },
  totalPrice: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_ADDITIVE:
      return {
        ...state,
        addIns: {
          ...state.addIns,
          [action.name]: state.addIns[action.name] + 1,
        },
        totalPrice: state.totalPrice + PRICES[action.name]
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
