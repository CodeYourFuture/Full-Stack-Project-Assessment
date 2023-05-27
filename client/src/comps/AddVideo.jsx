import React from "react";
import "../styles/AddVideo.css";

function AddVideo() {
  return (
    <div className="add-video-container">
    <h3>Add a new video</h3>
      <div className="inputs-container">
        <label htmlFor="title-input">Title:</label>
        <input
          className="add-video-input"
          type="text"
          id="title-input"
          placeholder="Insert the title of your video..."
        />
        <label htmlFor="url-input">Url:</label>
        <input
          className="add-video-input"
          type="url"
          id="url-input"
          placeholder="Insert url..."
        />
      </div>
      <button className="add-video-button">Submit</button>
    </div>
  );
}

export default AddVideo;
