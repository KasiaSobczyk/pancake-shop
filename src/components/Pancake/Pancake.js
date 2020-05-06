import React from 'react';
import styles from './Pancake.module.css';
import AddIns from '../Pancake/Add-ins/Add-ins';
import Base from '../Pancake/Base/Base';

const pancake = (props) => {
  let selectedIngredients = Object.keys(props.addIns)
    .map((k) => {
      return [...Array(props.addIns[k])].map((_, i) => {
        return <AddIns key={k + i} type={k} />;
      });
    })
    .reduce((prev, el) => {
      return prev.concat(el);
    }, []);
  if(selectedIngredients === 0) {
    return selectedIngredients = <h3>Add your ingredients!</h3>
  } 
  
  return (
    <div className={styles.Pancake}>
      <Base />
      {selectedIngredients}
    </div>
  );
};

export default pancake;
