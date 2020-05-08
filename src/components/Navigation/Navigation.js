import React from 'react';
import styles from './Navigation.module.css';
import Logo from '../Logo/Logo';
import Nav from './Nav/Nav';
import Toogle from './SideDrawer/Toogle/Toogle';

const navigation = (props) => (
  <header className={styles.header}>
    <Toogle toogle={props.switchToogle} />
    <div className={styles.logo}>
      <Logo />
    </div>
    <nav className={styles.desktop}>
      <Nav />
    </nav>
  </header>
);

export default navigation;
