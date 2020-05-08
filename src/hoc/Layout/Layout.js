import React, { Component } from 'react';
import Aux from '../AuxReact/react-aux';
import styles from './Layout.module.css';
import Navigation from '../../components/Navigation/Navigation';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    show: false,
  };

  toogleDrawerHandler = () => {
    this.setState((oldState) => {
      return { show: !oldState.show };
    });
  };
  closeSideDrawerHandler = () => {
    this.setState({ show: false });
  };
  render() {
    return (
      <Aux>
        <Navigation switchToogle={this.toogleDrawerHandler} />
        <SideDrawer close={this.closeSideDrawerHandler} open={this.state.show} />
        <main className={styles.main}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
