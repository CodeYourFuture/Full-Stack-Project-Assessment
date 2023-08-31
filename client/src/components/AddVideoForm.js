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
      <input
        onChange={handleChange}
        type="text"
        name="title"
        value={props.formData.title}
        placeholder="Title"
        className="form--input"
      />
      <input
        onChange={handleChange}
        type="text"
        name="url"
        value={props.formData.url}
        placeholder="url"
        className="form--input"
      />
      <button className="form--button">Add New Video</button>
    </form>
  );
}
