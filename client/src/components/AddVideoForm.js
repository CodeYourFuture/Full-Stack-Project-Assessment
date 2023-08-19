import React, { useState } from "react";

export default function AddVideoForm(props) {
  const [formData, setFormData] = useState({ title: "", url: "" });

  function handleAddVideo(event) {
    // stops refresh
    event.preventDefault();
    console.log(event.target);
    props.handleAddVideo();
  }

  function handleChange(event) {
    // stops refresh
    event.preventDefault();
    console.log(event.target.name);
  }

  return (
    <div className="form">
      <input
        onChange={handleChange}
        type="text"
        name="title"
        placeholder="Title"
        className="form--input"
      />
      <input
        onChange={handleChange}
        type="text"
        name="url"
        placeholder="url"
        className="form--input"
      />
      <button onClick={handleAddVideo} className="form--button">
        Add New Video
      </button>
    </div>
  );
}
