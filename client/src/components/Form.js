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
  const thingsArray = ["thing 1", "thing 2"];

  const thingsElements = thingsArray.map((thing) => <p key={thing}>{thing}</p>);
  function addVideo() {
    console.log("add video");
  }

  function addItem() {
    const newThingText = `Thing ${thingsArray.length + 1}`;
    thingsArray.push(newThingText);
    console.log(thingsArray);
  }

  return (
    <div className="buttons">
      <button className="cancel">cancel</button>
      <button className="add" onClick={addVideo}>
        add
      </button>
      <button onClick={addItem}>Add Element</button>
    </div>
  );
}

function Form(props) {
  return (
    <div className="form">
      <FormInputs />
      <Buttons />
      {props.thingsArray}
    </div>
  );
}

export default Form;
