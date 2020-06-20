import React from 'react';
import logoImg from '../../../assets/images/logo.png';
import styles from './Logo.module.css';

const logo = (props) => (
  <div className={styles.logo}>
    <img src={logoImg} alt="logo" />
    <p>&nbsp; Creator</p>
  </div>
);

export default logo;
