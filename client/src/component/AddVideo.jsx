import React, { useState } from "react";

function AddVideo({ onAddVideo }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || url.trim() === "") {
      alert("Please provide both a title and a URL.");
      return;
    }

    const newVideo = {
      id: Date.now(),
      url,
      rating: 0,
    };

    onAddVideo(newVideo);

    setTitle("");
    setUrl("");
  };

  return (
    <div className="AddVideo">
      <h2>Add a YouTube Video</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">Add Video</button>
      </form>
    </div>
  );
}

export default AddVideo;
