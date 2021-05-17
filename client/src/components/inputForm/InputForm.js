import React from 'react';

import Input from '../UI/input/Input';
import Button from '../UI/Button';

import classes from './InputForm.module.css';

const inputForm = (props) => {
  const formElement = props.form.map((item, index) => {
    return (
      <div key={item.id}>
        <p>{item.config.name}</p>
        <Input
          id={'input' + index}
          invalid={!item.config.valid}
          shouldValidate={item.config.validation}
          touched={item.config.touched}
          value={item.config.value}
          placeholder={item.config.placeholder}
          formInputHandler={(e) => props.formInputHandler(e, item.id)}
        />
        {!item.config.valid &&
          // props.shouldValidate &&
          item.config.touched && (
            <p className>{item.config.invalidInputInfo}</p>
          )}
      </div>
    );
  });

  return (
    <div>
      <h1>Add New Video</h1>
      {formElement}
      <Button disabled={props.buttonDisable} clicked={props.clicked}>
        UPLOAD
      </Button>
    </div>
  );
};

export default inputForm;
