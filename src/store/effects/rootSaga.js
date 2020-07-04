import { takeEvery } from 'redux-saga/effects';
import { auth, checkExpiryTime, checkAuthState, logout } from './auth';
import { fetchAddIns } from './pancakeCreator';
import { order, orders } from './summary';
import * as actions from '../actions/actions';

export function* watchPancake() {
  yield takeEvery(actions.FETCH_ADDINS, fetchAddIns);
}

export function* watchAuth() {
  yield takeEvery(actions.AUTH_USER, auth);
  yield takeEvery(actions.AUTH_CHECK_STATE, checkAuthState);
  yield takeEvery(actions.AUTH_TIMEOUT, checkExpiryTime);
  yield takeEvery(actions.AUTH_LOGOUT_INIT, logout);
}

export function* watchSummary() {
  yield takeEvery(actions.ORDER, order);
  yield takeEvery(actions.ORDERS, orders);
}
