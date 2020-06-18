import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PancakeCreator from './containers/PancakeCreator/PancakeCreator';
import Summary from './containers/Summary/Summary';
import Layout from './hoc/Layout/Layout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

function App() {
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

export default App;
