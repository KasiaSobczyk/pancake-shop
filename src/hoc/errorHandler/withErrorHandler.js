import React, { Component } from 'react';
import Modal from '../../components/Utilities/Modal/Modal';
import Aux from '../AuxReact/react-aux';

const withErrorHandler = (ChildComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentDidMount() {
      axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(res => res, (err) => {
        this.setState({
          error: err,
        });
      });
    }
    errorOccurHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal closed={this.errorOccurHandler} appear={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <ChildComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
