import React from 'react';
import styles from './Input.module.css';

const input = (props) => {
  let inputType = null;
  const classes = [styles.input];
  if(props.isValidation && props.touched && props.invalid){
    classes.push(styles.invalid)
  }

  switch (props.inputel) {
    case 'input':
      inputType = (
        <input
          className={classes.join(' ')}
          onChange={props.changed}
          value={props.value}
          {...props.inputConfig}
        />
      );
      break;
    case 'textarea':
      inputType = (
        <textarea
          className={classes.join(' ')}
          onChange={props.changed}
          value={props.value}
          {...props.inputConfig}
        />
      );
      break;
    case 'select':
      inputType = (
        <select className={classes.join(' ')} onChange={props.changed} value={props.value}>
          {props.inputConfig.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputType = <input className={classes.join(' ')} value={props.value} {...props.inputConfig} />;
  }
  return (
    <div className={styles.inputType}>
      <label className={styles.label}>{props.name}</label>
      {inputType}
    </div>
  );
};

export default input;
