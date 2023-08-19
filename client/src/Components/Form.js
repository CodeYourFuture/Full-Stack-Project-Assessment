import React, { useState } from "react";
import "./Form.css";

function Form({ fetchVideos }) {

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

    const newVideo = {
      title: videoForm.title,
      url: videoForm.url,
    };


    // Send POST request to add the new video
    fetch("https://video-server-kddf.onrender.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchVideos();
      })
      .catch((error) => {
        console.error(error);
      });

    // Clear the form fields and error message
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
