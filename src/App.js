import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Logout from "./containers/Auth/Logout/Logout";
import ContactData from "./containers/Summary/ContactData/ContactData";
import async from "./hoc/async/async";
import Layout from "./hoc/Layout/Layout";
import * as actions from "./store/actions";

const summaryAsync = async(() => {
  return import("./containers/Summary/Summary");
});

const ordersAsync = async(() => {
  return import("./containers/Orders/Orders");
});

const creatorAsync = async(() => {
  return import("./containers/PancakeCreator/PancakeCreator");
});

const authAsync = async(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {
  componentDidMount() {
    this.props.onAutoLogin();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={authAsync} />
        <Route path="/creator" component={creatorAsync} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/creator" component={creatorAsync} />
          <Route path="/checkout" component={summaryAsync} />
          <Route path="/contact" component={ContactData} />
          <Route path="/my-orders" component={ordersAsync} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={authAsync} />
          <Route path="/" exact component={Home} />
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
