import React, { useState } from "react";

function AddVideo({ onAdd }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (title === "") {
      alert("Title cannot be empty");
      return;
    } else if (!youtubeRegex.test(url)) {
      alert("The URL is not a valid YouTube URL");
      return;
    }
    onAdd({ title, url });
    setTitle("");
    setUrl("");
  }

  return (
    <form onSubmit={handleSubmit} className="addVideo-form">
      <label>
        Title:
        <input
          type="text"
          value={title}
          placeholder="Enter the Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        URL:
        <input
          type="text"
          value={url}
          placeholder="Enter the URL"
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <br />
      <button className="btn btn-success" type="submit">
        Upload
      </button>
    </form>
  );
}

export default AddVideo;
