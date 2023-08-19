import React, { useState } from "react";

export default function AddVideoForm(props) {
  const [formData, setFormData] = useState({ title: "", url: "" });

  function handleAddVideo(event) {
    // stops page refresh
    event.preventDefault();
    props.handleAddVideo(formData);
  }

  function handleChange(event) {
    // stops refresh
    event.preventDefault();
    console.log(event.target.name);
    setFormData((prevFormData) => {
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
        value={formData.title}
        placeholder="Title"
        className="form--input"
      />
      <input
        onChange={handleChange}
        type="text"
        name="url"
        value={formData.url}
        placeholder="url"
        className="form--input"
      />
      <button className="form--button">Add New Video</button>
    </form>
  );
}
