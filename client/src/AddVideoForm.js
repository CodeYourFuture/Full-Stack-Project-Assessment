import React, { useState } from "react";
import "./VideoComponent.css";


const AddVideoForm = ({ onAddVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate title and URL
    if (!title.trim()) {
      setError("Video title is required.");
      return;
    }
    if (!isValidYouTubeUrl(url)) {
      setError("Invalid YouTube URL.");
      return;
    }

    const newVideo = {
      id: Date.now(),
      title: title.trim(),
      url: url.trim(),
      rating: 0,
    };

    onAddVideo(newVideo);

    // Clear form fields and error
    setTitle("");
    setUrl("");
    setError("");
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
  );
};

export default AddVideoForm;
