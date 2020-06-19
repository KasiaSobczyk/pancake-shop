import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import PancakeCreator from './containers/PancakeCreator/PancakeCreator';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import { Component } from 'react';
import async from './hoc/async/async';

const summaryAsync = async(() => {
  return import('./containers/Summary/Summary');
});

const ordersAsync = async(() => {
  return import('./containers/Orders/Orders');
});

const authAsync = async(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount() {
    this.props.onAutoLogin();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={authAsync} />
        <Route path="/" exact component={PancakeCreator} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={summaryAsync} />
          <Route path="/my-orders" component={ordersAsync} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={authAsync} />
          <Route path="/" exact component={PancakeCreator} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoLogin: () => dispatch(actions.checkAuthState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
