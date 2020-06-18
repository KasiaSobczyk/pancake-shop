import React from 'react';
import SingleControl from './SingleControl/SignleControl';
import styles from './Controls.module.css';

const products = [
  { name: 'Butter', type: 'butter' },
  { name: 'Ice cream', type: 'iceCream' },
  { name: 'Chocolate', type: 'chocolate' },
  { name: 'Strawberry', type: 'strawberry'}
];

const Controls = (props) => (
  <div className={styles.control}>
    {products.map((i) => (
      <SingleControl
        key={i.name}
        isDisabled={props.disabled[i.type]}
        name={i.name}
        add={() => props.addNew(i.type)}
        remove={() => props.removeOne(i.type)}
      />
    ))}
    <h2>Total price: {props.price.toFixed(2)}</h2>
    <hr />
    <button type="button" disabled={!props.isAdded} onClick={props.ordered}>
      {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
    </button>
  </div>
);

export default Controls;
