import React from "react";
import { useState } from "react";

function Input(props) {
  const [isVisible, setIsVisible] = useState(false);

  function handleInputDisplay(e) {
    isVisible? setIsVisible(false):setIsVisible(true)
  }
  
  return (
    <div className="input-container">
      <div className="search">
        <button color1="true" onClick={handleInputDisplay}>
          Add Video
        </button>
        <div>
          <label htmlFor="search">Search</label>
          <input type="search" id="search" />
        </div>
      </div>

      <div className={isVisible ? "input-section" : "hidden"}>
        <div className="title-url">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={props.handleChange}
            value={props.reqBody.title}
            className="input-field"
          />
        </div>

        <div className="title-url">
          <label htmlFor="url">URL</label>
          <input
            type="text"
            name="url"
            id="url"
            onChange={props.handleChange}
            value={props.reqBody.url}
            className="input-field"
          />
        </div>

        <div>
          <button onClick={props.handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default Input;
