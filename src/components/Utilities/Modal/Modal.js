import React, { Component } from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/AuxReact/react-aux';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.children !== this.props.children || nextProps.appear !== this.props.appear;
  }

  render() {
    return (
      <Aux>
        <Backdrop close={this.props.closed} appear={this.props.appear} />
        <div
          style={{
            transform: this.props.appear ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.appear ? '1' : '0',
          }}
          className={styles.modal}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
