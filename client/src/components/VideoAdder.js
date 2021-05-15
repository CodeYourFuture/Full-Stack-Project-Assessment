import React from "react";

const Form = (props) => {
  const addNewVideo = (event) => {
    event.preventDefault();
    props.onAdd(getFormData(event.target));
  };
  return (
    <div class="form-container">
      <h2 className="form-title">Add Video</h2>
      <form id="form-add" onSubmit={addNewVideo}>
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

export function getFormData(form) {
  return {
    title: form.querySelector("#title").value,
    url: form.querySelector("#url").value,
  };
}
