import React, { Component } from 'react';
import style from '.SingleOrder.module.css';

const singleOrder = (props) => (
  <div className={style.order}>
    <p>Ingredients: </p>
    <p>
      Price: <b>434</b>{' '}
    </p>
  </div>
);

export default singleOrder;
