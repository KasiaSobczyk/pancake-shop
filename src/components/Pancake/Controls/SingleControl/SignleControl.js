import React from 'react';
import styles from './SingleControl.module.css';

const SingleControl = (props) => (
  <div className={styles.singleControl}>
    <div className={styles.name}>{props.name}</div>
    <button className={styles.less} onClick={props.remove} disabled={props.isDisabled}>Less</button>
    <button className={styles.more} onClick={props.add}>More</button>
  </div>
);

export default SingleControl;
