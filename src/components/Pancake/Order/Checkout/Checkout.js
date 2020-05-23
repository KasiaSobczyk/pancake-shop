import React from 'react';
import styles from './Checkout.module.css';
import Pancake from '../../Pancake';
import Button from '../../../Utilities/Button/Button';

const checkout = (props) => {
  return (
    <div className={styles.checkout}>
      <h1>Lorem ipsum dolor sit amet, consectetur!</h1>
      <div className={styles.pancake}>
        <Pancake addIns={props.addIns} />
      </div>
      <span>
        <Button class="danger" clicked={props.cancelCheckout}>
          CANCEL
        </Button>
        <Button class="success" clicked={props.submitCheckout}>
          SUBMIT
        </Button>
      </span>
    </div>
  );
};

export default checkout;
