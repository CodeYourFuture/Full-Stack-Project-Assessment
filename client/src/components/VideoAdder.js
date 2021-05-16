import React, { useState } from "react";
import { createVideoData, validateForm } from "../functions";

const Form = (props) => {
  const [errors, setErrors] = useState([]);
  const addNewVideo = (event) => {
    event.preventDefault();
    const errors = validateForm(event.target);
    if (errors.length > 0) {
      return setErrors(errors);
    }
    setErrors([]);
    props.onAdd(createVideoData(event.target));
    alert("Video added successfully.");
    event.target.reset();
  };

  return (
    <div class="form-container">
      <h2 className="form-title">Add YouTube Video</h2>
      <form id="form-add" onSubmit={addNewVideo}>
        {errors.map((e, index) => (
          <p key={index} className="error">
            {e}
          </p>
        ))}
        <label htmlFor="title">Title: </label>
        <input type="text" id="title" name="title"></input>
        <label htmlFor="url">URL: </label>
        <input type="text" id="url" name="url"></input>
        <button type="submit" id="add">
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;
