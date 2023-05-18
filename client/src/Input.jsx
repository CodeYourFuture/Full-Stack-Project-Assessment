import React, { useState } from "react";

function Input({ onAddVideo }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();
  if (isValidYouTubeURL(url) && isValidTitle(title)) {
    const embedUrl = generateEmbedURL(url);
    onAddVideo(title, embedUrl);
    setTitle("");
    setUrl("");
  } else {
    alert("Please enter a valid YouTube URL and a non-empty title.");
  }
  };
  
  const isValidTitle = (title) => {
    // Trim the title to remove leading and trailing spaces
    const trimmedTitle = title.trim();
    return trimmedTitle.length > 0;
  };


  const isValidYouTubeURL = (url) => {
    // Regular expression to match YouTube URL pattern
    const youtubeRegex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const generateEmbedURL = (url) => {
    // Replace "watch" with "embed" in the YouTube URL
    let embedUrl = url.replace("watch", "embed");
    // Replace "?v=" with "/"
    embedUrl = embedUrl.replace("?v=", "/");
    return embedUrl;
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="url">URL</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Input;
