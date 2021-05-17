import React from 'react';

const button = (props) => (
  <button disabled={props.disabled} onClick={props.clicked}>
    {props.children}
  </button>
);
export default button;
