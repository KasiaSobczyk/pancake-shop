import * as action from './actions';
import axios from '../../axios-conf';

export const initAddIns = (res) => {
  return {
    type: action.INIT_ADDINS,
    addIns: res,
  };
};

export const fetchAddIns = () => {
  return (dispatch) => {
    axios
      .get('https://pancake-shop.firebaseio.com/addIns.json')
      .then((res) => {
        dispatch(initAddIns(res.data));
      })
      .catch((err) => {
        dispatch(fetchAddInsFailed());
      });
  };
};

export const fetchAddInsFailed = () => {
  return {
    type: action.FETCH_ADDINS_FAILED,
  };
};

export const addAdditive = (name) => {
  return {
    type: action.ADD_ADDITIVE,
    name: name,
  };
};

export const removeAdditive = (name) => {
  return {
    type: action.REMOVE_ADDITIVE,
    name: name,
  };
};
