import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddVideo = ({ addVideo, urlError }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleForm = (title, url) => {
    setTitle("");
    setUrl("");
    addVideo(title, url);
  };

  return (
    <div className="AddVideo">
      <TextField
        variant="standard"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        variant="standard"
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button variant="contained" onClick={handleForm}>
        Add
      </Button>
      {urlError ? <p>Please enter a YouTube URL</p> : ""}
    </div>
  );
};

export default AddVideo;
