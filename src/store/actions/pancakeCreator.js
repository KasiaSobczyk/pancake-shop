import * as action from './actions';
import axios from '../../axios-conf';

export const initAddIns = (res) => {
  return {
    type: action.INIT_ADDINS,
    addIns: res,
  };
};

export const fetchAddIns = () => {
  return {
    type: action.FETCH_ADDINS,
  };
};

export const fetchAddInsFAILURE = () => {
  return {
    type: action.FETCH_ADDINS_FAILURE,
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
