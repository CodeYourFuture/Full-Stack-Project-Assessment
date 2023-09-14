import React, { useState } from "react";

function AddVideo({ updateVideoData }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleShowForm = () => {
    setShowForm(!showForm);
    setErrorMessage(""); // Reset error message when showing the form
  };

  const handleAddVideo = (event) => {
    event.preventDefault();

    // Check if the URL is a valid YouTube URL
    const youtubeUrlRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
    if (!youtubeUrlRegex.test(url)) {
      setErrorMessage("Invalid YouTube URL");
      setTitle(""); // Clear the title field
      setUrl(""); // Clear the URL field
      return;
    }

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
    <div className="addVideo">
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
            {errorMessage && <p>{errorMessage}</p>}
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
