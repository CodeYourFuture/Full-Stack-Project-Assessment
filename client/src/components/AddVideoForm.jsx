import React, { useState } from "react";
import "./AddVideoForm.css";

const AddVideoForm = ({ addVideo }) => {
  const [videoData, setVideoData] = useState({
    title: "",
    url: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = videoData.title.trim();
    const trimmedUrl = videoData.url.trim();

    const validationErrors = {};

    if (!trimmedTitle) {
      validationErrors.title = "Please enter a title.";
    }

    if (!trimmedUrl) {
      validationErrors.url = "Please enter a URL.";
    } else {
      const urlRegex = /^https?:\/\/\S+$/;
      if (!urlRegex.test(trimmedUrl)) {
        validationErrors.url = "Please enter a valid URL.";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newVideo = {
      title: trimmedTitle,
      url: trimmedUrl,
    };

    addVideo(newVideo);
    setVideoData({
      title: "",
      url: "",
    });
    setErrors({});
  };

  return (
    <div className="add-video-form" id="add-video-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={videoData.title}
            onChange={handleChange}
            className={`input-field ${errors.title ? "input-error" : ""}`}
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            name="url"
            value={videoData.url}
            onChange={handleChange}
            className={`input-field ${errors.url ? "input-error" : ""}`}
          />
          {errors.url && <p className="error-message">{errors.url}</p>}
        </div>
        <button type="submit" className="submit-button">
          Add Video
        </button>
      </form>
    </div>
  );
};

export default AddVideoForm;
