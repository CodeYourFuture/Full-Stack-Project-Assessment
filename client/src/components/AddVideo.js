import React, { useState } from "react";

function AddVideo({ updateVideoData }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleAddVideo = (event) => {
    event.preventDefault();

    const newVideoData = {
      title,
      url,
    };

    updateVideoData(newVideoData);
    handleShowForm();
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleAddVideo}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="url">URL:</label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="button" onClick={handleShowForm}>
              Cancel
            </button>
            <button type="submit">Add</button>
          </div>
        </form>
      ) : (
        <button type="button" onClick={handleShowForm}>
          Add Video
        </button>
      )}
    </div>
  );
}

export default AddVideo;
