import React from 'react';
import logoImg from '../../../assets/images/logo.png';
import styles from './Logo.module.css';
import { Link } from 'react-router-dom';

const logo = (props) => (
  <Link to="/" className={styles.logo}>
    <img src={logoImg} alt="logo" />
    <p>&nbsp; Creator</p>
  </Link>
);

export default logo;
