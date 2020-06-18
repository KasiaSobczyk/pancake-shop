import * as actions from '../actions/actions';
import { reducerHelper } from '../helper';

const PRICES = {
  butter: 1,
  strawberry: 2,
  chocolate: 2,
  iceCream: 3,
};

const initialState = {
  addIns: null,
  inProgress: false,
  totalPrice: 0,
  error: false,
};
const setAddIns = (state, action) => {
  return reducerHelper(state, {
    addIns: action.addIns,
    inProgress: false,
    error: false,
    totalPrice: 0,
  });
};

const setAddInsFail = (state, action) => {
  return reducerHelper(state, { error: true });
};

const addAdditive = (state, action) => {
  const newAdditive = { [action.name]: state.addIns[action.name] + 1 };
  const newAddIns = reducerHelper(state.addIns, newAdditive);
  const updatedState = {
    inProgress: true,
    addIns: newAddIns,
    totalPrice: state.totalPrice + PRICES[action.name],
  };
  return reducerHelper(state, updatedState);
};

const removeAdditive = (state, action) => {
  const updatedAdditive = { [action.name]: state.addIns[action.name] - 1 };
  const updatedAddIns = reducerHelper(state.addIns, updatedAdditive);
  const updatedSt = {
    inProgress: true,
    addIns: updatedAddIns,
    totalPrice: state.totalPrice + PRICES[action.name],
  };
  return reducerHelper(state, updatedSt);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.INIT_ADDINS:
      return setAddIns(state, action);
    case actions.FETCH_ADDINS_FAILURE:
      return setAddInsFail(state, action);
    case actions.ADD_ADDITIVE:
      return addAdditive(state, action);
    case actions.REMOVE_ADDITIVE:
      return removeAdditive(state, action);
    default:
      return state;
  }
};

export default reducer;
