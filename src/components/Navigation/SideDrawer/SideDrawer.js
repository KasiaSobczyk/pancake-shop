import React from 'react';
import styles from './SideDrawer.module.css';
import Logo from '../../Utilities/Logo/Logo';
import Nav from '../Nav/Nav';
import Backdrop from '../../Utilities/Backdrop/Backdrop';
import Aux from '../../../hoc/AuxReact/react-aux';

const sideDrawer = (props) => {
  let showDrawer = [styles.sideDrawer, styles.close];
  if (props.open) {
    showDrawer = [styles.sideDrawer, styles.open];
  }
  return (
    <Aux>
      <Backdrop appear={props.open} close={props.close} />
      <div className={showDrawer.join(' ')}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <nav>
          <Nav isAuth={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
