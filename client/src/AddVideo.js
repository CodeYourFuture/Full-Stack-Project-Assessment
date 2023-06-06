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

    fetch("https://server-full-stack-assessment.onrender.com/", {
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
      <fieldset>
        <legend>Add title and video link here</legend>
        <label>
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          <input
            type="text"
            value={url}
            placeholder="video link"
            onChange={(event) => setUrl(event.target.value)}
          />
        </label>
        <button type="submit">Add Video</button>
      </fieldset>
    </form>
  );
}

export default AddVideo;
