import React from 'react';
import Item from './NavItem/NavItem';
import styles from './Nav.module.css';

const nav = () => (
  <ul className={styles.nav}>
    <Item active link='/'>DUOA</Item>
    <Item link='/'>CART</Item>
  </ul>
);

export default nav;
