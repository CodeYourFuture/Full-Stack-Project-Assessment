import React from "react";
// import Buttons from "./Buttons";

function FormInputs() {
  return (
    <div className="form-inputs">
      <div className="form-input">
        <label>title</label>
        <input type="text" placeholder="type title" />
      </div>
      <div className="form-input">
        <label>url</label>
        <input type="text" placeholder="type url" />
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="buttons">
      <button className="cancel">cancel</button>
      <button className="add">add</button>
    </div>
  );
}

function Form() {
  return (
    <div className="form">
      <FormInputs />
      <Buttons />
    </div>
  );
}

export default Form;
