import React, { Component } from 'react';
import styles from './Add-ins.module.css';
import types from 'prop-types';

class AddIns extends Component {
  render() {
    let ingredientType = null;

    switch (this.props.type) {
      case 'doublePancake':
        ingredientType = <div className={styles.Pancake}></div>;
        break;
      case 'chocolate':
        ingredientType = <div className={styles.Chocolate}></div>;
        break;
      case 'butter':
        ingredientType = <div className={styles.Butter}></div>;
        break;
      case 'iceCream':
        ingredientType = <div className={styles.IceCream}></div>;
        break;
      case 'strawberry':
        ingredientType = <div className={styles.Strawberry}></div>;
        break;
      default:
        ingredientType = <div className={styles.Pancake}></div>;
    }
    return ingredientType;
  }
}

AddIns.types = {
  type: types.string.isRequired,
};

export default AddIns;
