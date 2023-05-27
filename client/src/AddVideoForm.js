import React, { useState } from "react";
import "./VideoComponent.css";


const AddVideoForm = ({ onAddVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [titleError, setTitleError] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    // clear error
    setTitleError("");
    setUrlError("");

    // Validate title and URL
    if (!title.trim()) {
      setTitleError("Video title is required.");
      return;
    }
    if (!isValidYouTubeUrl(url)) {
      setUrlError("Invalid YouTube URL.");
      return;
    }

    const newVideo = {
      id: Date.now(),
      title: title.trim(),
      url: url.trim(),
      rating: 0,
    };

    onAddVideo(newVideo);

    // Clear form fields
    setTitle("");
    setUrl("");
  };

  const isValidYouTubeUrl = (url) => {
    // Regular expression to validate YouTube URL
    const youtubeUrlRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
    return youtubeUrlRegex.test(url);
  };

  return (
    <form onSubmit={handleSubmit} className="video-form">
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>{titleError}</label>
      </label>
      <label>
        URL:
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <label>{urlError}</label>
      </label>
      <button type="submit">Add Video</button>
    </form>
  );
};

export default AddVideoForm;
