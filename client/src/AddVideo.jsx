import React, { useState } from 'react';
import './AddVideo.css';

function AddVideo({ onAdd }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title && url) {
      // Convert the URL to an embed URL
      const videoId = url.match(/(?:\?v=|\/embed\/|\/v\/|\.be\/)([a-zA-Z0-9_\-]+)/)[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;

      const newVideo = {
        id: Date.now(),
        title,
        url: embedUrl, // Use the embed URL
        rating: 0,
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
        <button className="btn" type="submit">
          Add Video
        </button>
      </form>
    </div>
  );
}

export default AddVideo;
