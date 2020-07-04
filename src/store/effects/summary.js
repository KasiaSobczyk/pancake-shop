import axios from '../../axios-conf';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* order(action) {
  yield put(actions.orderStart());
  const res = yield axios.post('/orders.json?auth=' + action.token, action.data);
  try {
    yield put(actions.orderSuccess(res.data.name, action.data));
  } catch (error) {
    yield put(actions.orderFailure());
  }
}

export function* orders(action) {
  yield put(actions.ordersInit());
  const queryParam = '?auth=' + action.token + '&orderBy="id"&equalTo="' + action.id + '"';
  const res = yield axios.get('/orders.json' + queryParam);
  try {
    let orders = [];
    for (let i in res.data) {
      orders.push({ ...res.data[i], id: i });
    }
    yield put(actions.ordersSuccess(orders));
  } catch (error) {
    yield put(actions.ordersFailure(error));
  }
}
