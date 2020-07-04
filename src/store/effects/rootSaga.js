import { takeEvery } from 'redux-saga/effects';
import { auth, checkExpiryTime, checkAuthState, logout } from './auth';
import * as actions from '../actions/actions';

export function* watchAuth() {
  yield takeEvery(actions.AUTH_USER, auth);
  yield takeEvery(actions.AUTH_CHECK_STATE, checkAuthState);
  yield takeEvery(actions.AUTH_TIMEOUT, checkExpiryTime);
  yield takeEvery(actions.AUTH_LOGOUT_INIT, logout);
}
