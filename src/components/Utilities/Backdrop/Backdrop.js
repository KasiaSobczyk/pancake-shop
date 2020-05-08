import React from 'react';
import styles from './Backdrop.module.css';

const backdrop = (props) => (props.appear ? <div onClick={props.close} className={styles.backdrop}></div> : null);

export default backdrop;
