import React, { useState } from "react";
import {backEndApi } from "../../config/config.js";

const VideoForm = ({ handleAddVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    if (title.trim() === "" || !isValidUrl(url)) {
      return;
    }

    try {
      const response = await fetch(`${backEndApi}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, url }),
      });

      if (response.ok) {
        setTitle("");
        setUrl("");
      } else {
        console.error("Error adding video:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  const isValidUrl = (url) => {
    return url.trim() !== "";
  };

  return (
    <div className="add-video-form">
      <h2>Add a Video</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button type="submit">Add Video</button>
      </form>
    </div>
  );
};

export default VideoForm;
