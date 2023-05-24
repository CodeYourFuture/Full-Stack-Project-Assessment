import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import ExtractVideoId from "../utils/ExtractVideoId";
import "../styles/AddVideoForm.css";

const AddVideoForm = ({ onAddVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [showForm, setShowForm] = useState(false);

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
  };

  const handleAddVideo = () => {
    const videoID = ExtractVideoId(url); // Corrected function name
    const video = {
      id: Math.floor(Math.random() * 1000000),
      title: title,
      url: `https://www.youtube.com/watch?v=${videoID}`,
      rating: 0,
    };
    onAddVideo(video);
    setTitle("");
    setUrl("");
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
              placeholder="Video Url"
              value={url}
              onChange={handleUrlChange}
              required
            />
          </div>
          <Button variant="contained" type="submit" onClick={handleAddVideo}>
            Add
          </Button>
        </form>
      )}
    </div>
  );
};

export default AddVideoForm;
