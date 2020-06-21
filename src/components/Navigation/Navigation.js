import React from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../Utilities/Logo/Logo';
import Nav from './Nav/Nav';
import styles from './Navigation.module.css';
import Toogle from './SideDrawer/Toogle/Toogle';

const navigation = (props) => (
  <header className={styles.header}>
    <Toogle toogle={props.switchToogle} />
    <div className={styles.logo} onClick={() => {return <Redirect exact to="/dupa" />}}>
      <Logo />
    </div>
    <nav className={styles.desktop}>
      <Nav isAuth={props.isAuth} />
    </nav>
  </header>
);

export default navigation;
