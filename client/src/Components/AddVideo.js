import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddVideo = ({
  videos,
  handleVideos,
  hideForm,
  handleLoading,
  setError,
}) => {
  // Form controls
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  // Form error
  const [titleError, setTitleError] = useState(false);
  const [urlError, setUrlError] = useState(false);

  // Adds a video
  const addVideo = () => {
    if (!title) {
      // If the title is not provided
      setTitleError(true);
    } else if (!url || !url.includes("youtube")) {
      // If the url is not provided or the url is not from youtube
      setTitleError(false);
      setUrlError(true);
    } else {
      // Resets the previous errors if any
      setTitleError(false);
      setUrlError(false);
      handleLoading(true);
      const fixedUrl = url.replace("watch?v=", "embed/"); // Changes the url to fix the iframe error
      const newVideo = {
        title: title,
        url: fixedUrl,
      };
      fetch("https://cyf-videos.herokuapp.com", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVideo),
      }).catch((error) => setError(error));
      newVideo.id = newVideo.id ? newVideo.id + 1 : 0; // This id is only for the client array and is not sent to the server
      handleVideos([...videos, newVideo]);
      handleLoading(false);
    }
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
        <Button variant="contained" color="success" onClick={addVideo}>
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
