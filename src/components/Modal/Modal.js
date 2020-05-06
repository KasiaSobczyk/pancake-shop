import React from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../hoc/react-aux';
const modal = (props) => (
  <Aux>
    <Backdrop close={props.closed} appear={props.appear}/>
    <div
      style={{
        transform: props.appear ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.appear ? '1' : '0',
      }}
      className={styles.modal}
    >
      {props.children}
    </div>
  </Aux>
);

export default modal;
