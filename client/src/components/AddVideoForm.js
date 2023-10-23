import React, { useState } from "react";

const AddVideoForm = ({ onAddVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const newVideo = {
      title,
      url
    };
    onAddVideo(newVideo);
    setTitle("");
    setUrl("");
  };
  return (
    <form onSubmit={handleSubmit} className="add_video_form">
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
