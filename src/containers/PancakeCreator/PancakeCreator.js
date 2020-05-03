import React, { Component } from 'react';

import Aux from '../../hoc/react-aux';
import Pancake from '../../components/Pancake/Pancake';
import styles from './PancakeCreator.module.css';

class PancakeCreator extends Component {
  render() {
    return (
      <Aux>
        <div className="PancakeLayout">
          <Pancake />
          <div>Add ingredient</div>
        </div>
      </Aux>
    );
  }
}

export default PancakeCreator;
