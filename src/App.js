import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PancakeCreator from './containers/PancakeCreator/PancakeCreator';
import Summary from './containers/Summary/Summary';
import Layout from './hoc/Layout/Layout';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={PancakeCreator} />
        <Route path="/checkout" component={Summary} />
      </Switch>
    </Layout>
  );
}

export default App;
