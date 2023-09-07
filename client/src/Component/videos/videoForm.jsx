// src/components/AddVideoForm.js
import React, { useState } from "react";

const VideoForm = ({ handleAddVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    if (title.trim() === "" || !isValidUrl(url)) {
      return;
    }
    
    handleAddVideo({ title, url });
    setTitle("");
    setUrl("");
  };

  const isValidUrl = (url) => {
    // You can implement your YouTube URL validation logic here
    // For simplicity, we'll assume any non-empty URL is valid
    return url.trim() !== "";
  };


  return (
    <div className="add-video-form">
      <h2>Add a Video</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button type="submit">Add Video</button>
      </form>
    </div>
  );
};

export default VideoForm;
