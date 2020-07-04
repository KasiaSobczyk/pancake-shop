import axios from '../../axios-conf';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* fetchAddIns(action) {
  try {
    const res = yield axios.get('https://pancake-shop.firebaseio.com/addIns.json');
    yield put(actions.initAddIns(res.data));
  } catch (error) {
    yield put(actions.fetchAddInsFAILURE());
  }
}
