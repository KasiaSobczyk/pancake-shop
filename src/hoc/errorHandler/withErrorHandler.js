import React, { Component } from 'react';
import Modal from '../../components/Utilities/Modal/Modal';
import Aux from '../AuxReact/react-aux';

const withErrorHandler = (ChildComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    //register interceptor
    componentWillMount() {
      this.req = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.res = axios.interceptors.response.use(
        (res) => res,
        (err) => {
          this.setState({
            error: err,
          });
        }
      );
    }
    errorOccurHandler = () => {
      this.setState({ error: null });
    };

    componentWillUnmount() {
      axios.interceptors.request.eject(this.req);
      axios.interceptors.request.eject(this.res);
    }
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
