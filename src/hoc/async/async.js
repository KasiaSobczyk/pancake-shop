import React, { Component } from 'react';

const async = (component) => {
  return class extends Component {
    state = {
      component: null,
    };

    componentDidMount() {
      component().then((c) => {
        this.setState({ component: c.default });
      });
    }

    render() {
      const Cmp = this.state.component;

      return Cmp ? <Cmp {...this.props} /> : null;
    }
  };
};

export default async;
