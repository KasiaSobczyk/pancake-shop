import React, { Component } from 'react';

import Aux from '../../hoc/react-aux';
import Pancake from '../../components/Pancake/Pancake';
import styles from './PancakeCreator.module.css';

class PancakeCreator extends Component {
  state = {
    addIns: {
      // chocolate: 1,
      iceCream: 1,
      // butter: 1,
      strawberry: 1,
    },
  };
  render() {
    return (
      <Aux>
        <div className={styles.PancakeLayout}>
          <div className={styles.col}>
            <Pancake addIns={this.state.addIns} />
          </div>
          <div className={styles.col}>
            <ul>
              <li>Add ingredient</li>
              <li>Add ingredient</li>
              <li>Add ingredient</li>
              <li>Add ingredient</li>
              <li>Add ingredient</li>
            </ul>
          </div>
        </div>
      </Aux>
    );
  }
}

export default PancakeCreator;
