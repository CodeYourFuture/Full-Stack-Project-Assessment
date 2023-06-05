import React, { useState } from "react";
import "./Form.css";

function Form({ onAddVideo }) {

  const [videoForm, setVideoForm] = useState({
      url: "",
      title: "",
      error: ""
  })

  const handleTitleChange = (event) => {
    setVideoForm({...videoForm, title: event.target.value});
  };

  const handleUrlChange = (event) => {
    setVideoForm({...videoForm, url: event.target.value});
  };

  const validateUrl = (inputUrl) => {
    // Regular expression pattern for matching YouTube URLs
    const youtubeUrlPattern =
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})$/;

    return youtubeUrlPattern.test(inputUrl);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (videoForm.title.trim() === "") {
      setVideoForm({...videoForm, error: "Title cannot be empty"})
    }

    if (!validateUrl(videoForm.url)) {
      setVideoForm({...videoForm, error: "invalid YouTube URL"});
      return;
    }

    const currentDate = new Date();
    const id = currentDate.getTime(); // Use the timestamp as the ID
    const newVideo = {
      id: id,
      title: videoForm.title,
      url: videoForm.url,
      rating: 0,
      uploadedAt: currentDate.toLocaleString() // Store the upload timestamp
    };

    onAddVideo(newVideo);
    setVideoForm({...videoForm, title: "", url: ""})
  };

  return (
    <div className="form">
      <div id="form">
        <form action="#" method="get">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={videoForm.title}
            onChange={handleTitleChange}
            required
          />
          <br />
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            name="url"
            placeholder="URL"
            value={videoForm.url}
            onChange={handleUrlChange}
            required
          />
          <br />
        </form>
      </div>
      {videoForm.error && <p className="error">{videoForm.error}</p>}
      <button className="add-button" onClick={handleSubmit}>
        ADD
      </button>
    </div>
  );
}

export default Form;
