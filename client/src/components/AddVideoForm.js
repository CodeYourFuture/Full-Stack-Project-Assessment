import React, { useState } from "react";

const AddVideoForm = ({ handleAddVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddVideo(title, url);
    setTitle("");
    setUrl("");
  };

  return (
    <div className="add-video-form">
      <h2>Add New Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Video</button>
      </form>
    </div>
  );
};

export default AddVideoForm;
