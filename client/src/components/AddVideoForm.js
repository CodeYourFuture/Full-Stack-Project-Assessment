import React from "react";

export default function AddVideoForm(props) {
  function handleAddVideo(event) {
    event.preventDefault();
    props.handleAddVideo(props.formData);
  }

  function handleChange(event) {
    event.preventDefault();
    props.setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <form onSubmit={handleAddVideo} className="form">
      <label htmlFor="title">Title</label>
      <input
        onChange={handleChange}
        type="text"
        id="title"
        name="title"
        value={props.formData.title}
        className="form--input"
      />
      <label htmlFor="url">URL</label>
      <input
        onChange={handleChange}
        type="text"
        id="url"
        name="url"
        value={props.formData.url}
        className="form--input"
      />
      <button className="form--button">Add New Video</button>
    </form>
  );
}
