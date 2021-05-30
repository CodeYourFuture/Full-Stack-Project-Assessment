import React, { useState } from "react";
import { addVideoToServer, validateForm } from "../functions";

const Form = () => {
  const [errors, setErrors] = useState([]);
  const addNewVideo = (event) => {
    event.preventDefault();
    const errors = validateForm(event.target);
    if (errors.length > 0) {
      return setErrors(errors);
    }
    setErrors([]);
    addVideoToServer(event.target);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add YouTube Video</h2>
      <form id="form-add" onSubmit={addNewVideo}>
        {errors.map((e, index) => (
          <p key={index} className="error">
            {e}
          </p>
        ))}
        <label htmlFor="title">Title: </label>
        <input type="text" id="title" name="title" />
        <label htmlFor="url">URL: </label>
        <input type="text" id="url" name="url" />
        <button type="submit" id="add">
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;
