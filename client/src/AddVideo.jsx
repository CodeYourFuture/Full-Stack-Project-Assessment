import React, { useState } from 'react';
import './AddVideo.css'; 


function AddVideo({ onAdd }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title && url) {
      const newVideo = {
        id: Date.now(), // A simple way to generate a unique ID
        title,
        url,
        rating: 0, // Set an initial rating
      };

      onAdd(newVideo);

      setTitle('');
      setUrl('');
    }
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
        <button className="btn" type="submit">Add Video</button>
      </form>
    </div>
  );
}

export default AddVideo;
