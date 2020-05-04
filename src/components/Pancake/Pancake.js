import React from 'react';
import styles from './Pancake.module.css';
import AddIns from '../Pancake/Add-ins/Add-ins';
import Base from '../Pancake/Base/Base';

const pancake = (props) => {
  const selectedIngredients = Object.keys(props.addIns).map((k) => {
    return [...Array(props.addIns[k])].map((_, i) => {
      return <AddIns key={k + 1} type={k} />;
    });
  });
  return (
    <div className={styles.Pancake}>
      <Base />
      {selectedIngredients}
    </div>
  );
};

export default pancake;
