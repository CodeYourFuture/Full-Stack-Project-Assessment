import React, { useState } from "react";

function AddVideoButton(props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onVideoAdded(title, url);
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={handleUrlChange}
      />
      <button type="submit">Add Video</button>
    </form>
  );
}


export default AddVideoButton;