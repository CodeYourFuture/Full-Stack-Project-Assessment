import React, { useState } from "react";
import AddButton from "./AddButton";

const AddVideo = ({ addVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();
    setTitle();
    let vidObj = {
      id: `${url.slice(url.indexOf("=") + 1)}`,
      title: title,
      url: url,
      rating: 0,
    };
    addVideo(vidObj);
  };

  return (
    <form className="form-group search-box" onSubmit={handleAdd}>
      <div className="search-row">
        <label htmlFor="vidTitle">Video Title</label>
        <input
          type="text"
          id="vidTitle"
          className="form-control"
          placeholder="Enter Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="search-row">
        <label htmlFor="vidUrl">Video URL</label>
        <input
          type="text"
          id="vidUrl"
          className="form-control"
          placeholder="Enter Video URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <AddButton />
    </form>
  );
};

export default AddVideo;
