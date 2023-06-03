import React, { useState } from "react";
import "../styles/AddVideo.css";

function AddVideo({ onVideoAdd }) {
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  

  const handleNewTitle = (e) => {
    setNewVideoTitle(e.target.value);
  };

  const handleNewUrl = (e) => {
    setNewVideoUrl(e.target.value);
  };

  const handleAddVideo = () => {
    if (newVideoTitle && newVideoUrl) {
      const video = {
        title: newVideoTitle,
        url: newVideoUrl,
        rating: 0
      };

      onVideoAdd(video);

      // Clear the form
      setNewVideoTitle("");
      setNewVideoUrl("");
    }
  };

  return (
    <div className="add-video-container">
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
      <button onClick={handleAddVideo} className="add-video-button">
        Add video
      </button>
    </div>
  );
}

export default AddVideo;

