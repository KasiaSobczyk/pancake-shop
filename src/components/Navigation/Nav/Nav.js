import React from 'react';
import Item from './NavItem/NavItem';
import styles from './Nav.module.css';

const nav = () => (
  <ul className={styles.nav}>
    <Item exact link="/">
      Crete pancake
    </Item>
    <Item link="/my-orders">Orders</Item>
  </ul>
);

export default nav;
