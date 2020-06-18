import React from 'react';
import Item from './NavItem/NavItem';
import styles from './Nav.module.css';

const nav = (props) => (
  <ul className={styles.nav}>
    <Item exact link="/">
      Crete pancake
    </Item>
    {props.isAuth ? <Item link="/my-orders">Orders</Item> : null}
    {!props.isAuth ? <Item link="/auth">Account</Item> : <Item link="/logout">Logout</Item>}
  </ul>
);

export default nav;
