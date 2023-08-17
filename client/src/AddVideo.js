import React, { useState } from "react";

function extractID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function AddVideo({ onAdd }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  //const [id, setId] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const id = extractID(url);
    onAdd({ title, url, id });
    setTitle("");
    setUrl("");
    //setId("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Add Video</button>
    </form>
  );
}
export default AddVideo;
