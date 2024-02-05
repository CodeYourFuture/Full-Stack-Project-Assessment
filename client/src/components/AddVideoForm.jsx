import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import ExtractVideoId from "../utils/ExtractVideoId";
import "../styles/AddVideoForm.css";

const AddVideoForm = ({ onAddVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddVideo({ title, url });
    setTitle("");
    setUrl("");
  };

  const handleAddVideoClick = () => {
    setShowForm((prevShowForm) => !prevShowForm); // Toggle the value of showForm
    setErrorMessage("")
  };

  const handleAddVideo = (event) => {
    event.preventDefault();

    const videoID = ExtractVideoId(url);

    const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    if (!youtubeUrlRegex.test(url)) {
      setErrorMessage("Invalid YouTube URL. Please provide a valid YouTube link.");
      return;
    }

    const video = {
      title: title,
      url: `https://www.youtube.com/watch?v=${videoID}`,
    };
    onAddVideo(video);
    setTitle("");
    setUrl("");
    setErrorMessage("");
  };

  return (
    <div className="add-video-container">
      <h2 className="add-video-text" onClick={handleAddVideoClick}>
        {showForm ? "Cancel" : "Add Video"}
      </h2>
      {showForm && (
        <form className="add-video-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <TextField
              id="title"
              placeholder="Video title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="url">URL</label>
            <TextField
              id="url"
              placeholder="Youtube Video Url"
              value={url}
              onChange={handleUrlChange}
              required
            />
          </div>
          
          {errorMessage && (
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          )}

          <Button variant="contained" type="submit" onClick={handleAddVideo}>
            Add
          </Button>
        </form>
      )}
    </div>
  );
};

export default AddVideoForm;
