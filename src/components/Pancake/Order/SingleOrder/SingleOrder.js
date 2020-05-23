import React from 'react';
import style from './SingleOrder.module.css';

const singleOrder = (props) => {
  let addOns = [];

  for (let i in props.addOns) {
    addOns.push({ name: i, amount: props.addOns[i] });
  }

  const addOnsList = addOns.map((i) => {
    return (
      <li key={i.name}>
        {i.name}({i.amount})
      </li>
    );
  });
  return (
    <div className={style.order}>
      <p>Ingredients: </p>
      <ul>{addOnsList}</ul>
      <p>
        Price: <b>{props.totalPrice}</b>
      </p>
    </div>
  );
};

export default singleOrder;
