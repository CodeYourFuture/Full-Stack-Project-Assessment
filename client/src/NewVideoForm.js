// NewVideoForm.js

import React, { useState } from "react";

function NewVideoForm(props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    props.onAdd({
      id: new Date().getTime(),
      title,
      url,
      rating: 0,
    });

    setTitle("");
    setUrl("");
  }

  return (
    <form onSubmit={handleSubmit} className="new-video-form">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="YouTube URL" />

      <button type="submit">Add Video</button>
    </form>
  );
}

export default NewVideoForm;
