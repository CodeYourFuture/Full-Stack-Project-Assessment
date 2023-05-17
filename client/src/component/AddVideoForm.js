import React, { useState } from "react";

const AddVideoForm = ({ onAddVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVideo = {
      id: Date.now().toString(),
      title,
      url,
      rating: 0,
    };
    onAddVideo(newVideo);
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-video-form">
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
  );
};

export default AddVideoForm;
