import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import PancakeCreator from './containers/PancakeCreator/PancakeCreator';
import Summary from './containers/Summary/Summary';
import Layout from './hoc/Layout/Layout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import { Component } from 'react';

class App extends Component {
  componentDidMount() {
    this.props.onAutoLogin();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={PancakeCreator} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Summary} />
          <Route path="/my-orders" component={Orders} />
          <Route path="/logout" component={Logout} />
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
