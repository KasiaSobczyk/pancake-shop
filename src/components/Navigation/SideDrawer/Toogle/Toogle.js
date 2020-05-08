import React from 'react';
import styles from './Toogle.module.css';

const toogle = (props) => (
  <div className={styles.toogle} onClick={props.toogle}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default toogle;
