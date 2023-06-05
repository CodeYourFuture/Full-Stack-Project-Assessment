import React, { useState } from "react";
import "./Form.css";

function Form({ onAddVideo }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const validateUrl = (inputUrl) => {
    // Regular expression pattern for matching YouTube URLs
    const youtubeUrlPattern =
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})$/;

    return youtubeUrlPattern.test(inputUrl);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === "") {
      setError("Title cannot be empty");
      return;
    }

    if (!validateUrl(url)) {
      setError("Invalid YouTube URL");
      return;
    }

    const currentDate = new Date();
    const id = currentDate.getTime(); // Use the timestamp as the ID
    const newVideo = {
      id: id,
      title: title,
      url: url,
      rating: 0,
    };

    onAddVideo(newVideo);
    setTitle("");
    setUrl("");
    setError("");
  };

  return (
    <div className="form">
      <a href="#">Add Videos</a>
      <div id="form">
        <form action="#" method="get">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            required
          />
          <br />
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            name="url"
            placeholder="URL"
            value={url}
            onChange={handleUrlChange}
            required
          />
          <br />
        </form>
      </div>
      {error && <p className="error">{error}</p>}
      <button className="add-button" onClick={handleSubmit}>
        ADD
      </button>
    </div>
  );
}

export default Form;
