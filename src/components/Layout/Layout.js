import React from 'react';
import Aux from '../../hoc/react-aux';
import styles from './Layout.module.css';

const layout = (props) => (
  <Aux>
    <div>toolbar, sidedrawer, backdrop</div>
    <main className={styles.main}>{props.children}</main>
  </Aux>
);

export default layout;
