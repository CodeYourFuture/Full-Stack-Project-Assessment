import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  const inputCSSClasses = [classes.inputClass];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputCSSClasses.push(classes.Invalid);
  }
  const inputItem = (
    <input
      className={inputCSSClasses.join(' ')}
      placeholder={props.placeholder}
      onChange={props.formInputHandler}
      value={props.value}
      {...props.elementConfig}
    />
  );

  return inputItem;
};

export default input;
