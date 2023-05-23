import React, { useState } from "react";
import "../styles/AddVideoForm.css";

const AddVideoForm = ({ onAddVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddVideo({ title, url });
    setTitle("");
    setUrl("");
  };

  const handleAddVideoClick = () => {
    setShowForm((prevShowForm) => !prevShowForm); // Toggle the value of showForm
  };

  return (
    <div className="add-video-container">
      <h2 className="add-video-text" onClick={handleAddVideoClick}>
        {showForm ? "Cancel" : "Add Video"}
      </h2>
      {showForm && (
        <form className="add-video-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              placeholder="Video title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="url">URL:</label>
            <input
              type="url"
              id="url"
              placeholder="Video URL"
              value={url}
              onChange={handleUrlChange}
              required
            />
          </div>
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
};

export default AddVideoForm;
