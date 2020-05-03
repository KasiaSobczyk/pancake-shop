import React, { Component } from 'react';
import styles from './Add-ins.module.css';
import types from 'prop-types';

class AddIns extends Component {
  render() {
    let ingredientType = null;

    switch (this.props.type) {
      case 'pancake':
        ingredientType = <div className={styles.Pancake}></div>;
        break;
      case 'pancake_1':
        ingredientType = <div className={styles.Pancake_1}></div>;
        break;
      case 'pancake_2':
        ingredientType = <div className={styles.Pancake_2}></div>;
        break;
      case 'pancake_3':
        ingredientType = <div className={styles.Pancake_3}></div>;
        break;
      case 'butter':
        ingredientType = <div className={styles.Cheese}></div>;
        break;
      default:
        ingredientType = <p>DUPA</p>;
    }
    return ingredientType;
  }
}

AddIns.types = {
  type: types.string.isRequired,
};

export default AddIns;
