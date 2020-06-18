import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
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
    return (
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/checkout" component={Summary} />
          <Route path="/my-orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={PancakeCreator} />
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoLogin: () => dispatch(actions.checkAuthState()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
