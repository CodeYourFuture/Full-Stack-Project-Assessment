import React, { useState } from "react";

const AddVideo = ({ onAddVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const clearForm = () => {
    setTitle("");
    setUrl("");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onAddVideo(title, url, clearForm);
  };

  return (
    <div className="add-video">
      <h3>Add a Video</h3>
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
        <button type="submit">Add Video</button>{" "}
      </form>
    </div>
  );
};

export default AddVideo;
