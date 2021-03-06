import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import pancakeReducer from './store/reducers/pancakeCreator';
import summaryReducer from './store/reducers/summary';
import authReducer from './store/reducers/auth';
import createSagaMiddleware from 'redux-saga';
import { watchPancake, watchAuth, watchSummary } from './store/effects/rootSaga';

const enhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const reducers = combineReducers({
  pancake: pancakeReducer,
  summary: summaryReducer,
  auth: authReducer,
});

const saga = createSagaMiddleware();

const store = createStore(reducers, enhancers(applyMiddleware(thunkMiddleware, saga)));

saga.run(watchAuth);
saga.run(watchPancake);
saga.run(watchSummary);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
