import React from 'react';
import styles from './Pancake.module.css';
import AddIns from '../Pancake/Add-ins/Add-ins';

const pancake = (props) => {
  return (
    <div className={styles.Pancake}>
      <AddIns type="pancake" />
      <AddIns type="pancake_1" />
      <AddIns type="pancake_2" />
      <AddIns type="pancake_3" />
    </div>
  );
};

export default pancake;
