import { put, delay } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

const base = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const key = '?key=AIzaSyB6ALB6ktWzd59D5rECC_2boQw8SbcTHWk';

export function* checkExpiryTime(action) {
  yield delay(action.authTime * 1000);
  yield put(actions.logout);
}

export function* auth(action) {
  yield put(actions.authInit());
  const user = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  const urlSignUp = base + 'signUp' + key;
  const urlSignIn = base + 'signInWithPassword' + key;
  let url = action.isAuth ? urlSignIn : urlSignUp;
  try {
    const res = yield axios.post(url, user);
    const expTime = new Date(new Date().getTime() + res.data.expiresIn * 1000);
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('userId', res.data.localId);
    yield localStorage.setItem('expirationDate', expTime);
    yield put(actions.authSuccess(res.data.localId, res.data.idToken));
    yield put(actions.checkExpiryTime(res.data.expiresIn));
  } catch (error) {
    yield put(actions.authFailure(error.response.data.error));
  }
}

export function* checkAuthState(action) {
  const token = localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expTime = new Date(localStorage.getItem('expirationDate'));
    if (expTime <= new Date()) {
      const user = localStorage.getItem('userId');
      yield put(actions.authSuccess(user, token));
      yield put(actions.checkExpiryTime((expTime.getTime() - new Date().getTime()) / 1000));
    } else {
      yield put(actions.logout());
    }
  }
}

export function* logout(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('localId');
  yield localStorage.removeItem('expirationDate');
  yield put(actions.logoutSuccess());
}
