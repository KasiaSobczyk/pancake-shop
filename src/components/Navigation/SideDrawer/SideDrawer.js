import React from 'react';
import styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import Nav from '../Nav/Nav';
import Backdrop from '../../Backdrop/Backdrop';
import Aux from '../../../hoc/react-aux';

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
          <Nav />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
