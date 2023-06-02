import React, { useState } from "react";

function AddVideo({ onAddVideo }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!title || !url) return;

    const newVideo = {
      title: title,
      url: url
    }

    fetch("http://localhost:9999", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((res) => res.json())
      .then((data) => onAddVideo(data));
    setTitle("");
    setUrl("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label>
        URL:
        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </label>
      <button type="submit">Add Video</button>
    </form>
  );
}

export default AddVideo;
