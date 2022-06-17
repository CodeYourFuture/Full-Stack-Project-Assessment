import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddVideo = ({ addVideo, titleError, urlError, hideForm }) => {
  // Form controls
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const submitForm = () => {
    setTitle("");
    setUrl("");
    addVideo(title, url);
    hideForm(false);
  };

  const closeForm = () => {
    setTitle("");
    setUrl("");
    hideForm(false);
  };

  return (
    <div className="Add-video">
      <TextField
        sx={{
          mb: 2,
        }}
        variant="standard"
        error={titleError}
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        sx={{
          mb: 5,
        }}
        variant="standard"
        error={urlError}
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="form-buttons">
        <Button variant="contained" color="success" onClick={submitForm}>
          Add
        </Button>
        <Button variant="contained" color="error" onClick={closeForm}>
          Cancel
        </Button>
      </div>
      {/* Displays the form error type */}
      {titleError ? (
        <p>Please enter a title</p>
      ) : urlError ? (
        <p>Please enter a YouTube URL</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddVideo;
