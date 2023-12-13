import React, { useState } from 'react';
import './AddVideo.css';

function AddVideo({ handleAddVideo }) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Form submitted");
      if (title.trim() === "" || !isValidUrl(url)) {
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5000/`, {
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
    <div className="add-video-container">
      <h2>Add a Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>URL:</label>
          <input
            className="form-control"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button className="btn" type="submit">
          Add Video
        </button>
      </form>
    </div>
  );
}

export default AddVideo;