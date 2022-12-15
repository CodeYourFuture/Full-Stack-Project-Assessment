import React, { useState, useEffect, useRef } from "react";
import AddButton from "./buttons/AddButton";
import TextField from "@mui/material/TextField";

const AddVideo = ({ addVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleAdd = (event) => {
    event.preventDefault();
    ref.current.focus();
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
        <TextField
          label="Outlined secondary"
          color="secondary"
          focused
          required
          id="outlined-required"
          // label="Required"
          type="text"
          className="form-control"
          placeholder="Enter Video Title"
          value={title}
          ref={ref}
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
