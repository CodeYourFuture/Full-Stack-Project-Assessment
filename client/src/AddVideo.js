import React, { useState } from "react";
import "./AddVideo.css";


const AddVideo = ({ onAddVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && url) {
      onAddVideo({ title, url });
      setTitle("");
      setUrl("");
    }
  };

  return (
    <div className="add-video">
      <h2>Add Video</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Add Video</button>
      </form>
    </div>
  );
};

export default AddVideo;
