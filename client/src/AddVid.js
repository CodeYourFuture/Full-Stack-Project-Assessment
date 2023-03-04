import React, { useState } from "react";
// import AddButton from "./AddButton";

function AddVid({ newVideoData }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the newVideoData function with the input data
    newVideoData({ title: title, url: url });

    // Reset the input fields
    setTitle("");
    setUrl("");
  };

  return (
    <div className="vidAdd-container">
      <p>Add a new video:</p>
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddVid;
