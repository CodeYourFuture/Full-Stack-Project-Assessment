import React, { useState } from "react";

const VideoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && url) {
      onAdd({ title, url });
      setTitle("");
      setUrl("");
    }
  };

  return (
    <form className="video-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="url"
        placeholder="YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Add Video</button>
    </form>
  );
};

export default VideoForm;
