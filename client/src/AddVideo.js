import React, { useState } from "react";
import "./AddVideo.css";

const AddVideo = ({ onAddVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && url) {
      // Create a new video object
      const newVideo = {
        title,
        url,
        rating: 0, 
      };

     onAddVideo(newVideo); // Pass the new video data to the parent component
      setTitle(""); // Clear input fields
      setUrl("");
    } else {
      // Handle the case where either title or URL is not provided
      alert("Both title and URL must be provided.");
    }
  };

return (
    <div className="add-video">
      <h2 className="add-video-header">Add Video</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Add Video</button>
      </form>
    </div>
  );
};

export default AddVideo;

