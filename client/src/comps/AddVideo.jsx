import React, { useState } from "react";
import "../styles/AddVideo.css";

function AddVideo() {
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");

  function handleNewTitle(e) {
    setNewVideoTitle(e.target.value);
  }

  function handleNewUrl(e) {
    setNewVideoUrl(e.target.value);
  }

  return (
    <form className="add-video-container">
      <h3>Add a new video</h3>
      <div className="inputs-container">
        <label htmlFor="title-input">Title:</label>
        <input
          className="add-video-input"
          type="text"
          id="title-input"
          value={newVideoTitle}
          onChange={handleNewTitle}
          placeholder="Insert the title of your video..."
        />
        <label htmlFor="url-input">Url:</label>
        <input
          className="add-video-input"
          type="url"
          id="url-input"
          value={newVideoUrl}
          onChange={handleNewUrl}
          placeholder="Insert url..."
        />
      </div>
      <button
        type="submit"
        className="add-video-button"
      >
        Add video
      </button>
    </form>
  );
}

export default AddVideo;
