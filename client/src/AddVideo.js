import React, { useState } from 'react';
import config from './config.js';

const AddVideo = ({ addVideo }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleAddVideo = (e) => {
    e.preventDefault();
    const newVideo = {
      title: title,
      url: url,
      rating: 0,
    };
    fetch(`${config.REACT_APP_BACKEND_URL}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add video');
        }
        return response.json();
      })
      .then((data) => {
        console.log('New video added with ID:', data.id);
        addVideo({ ...newVideo, id: data.id }); // Update UI with new video
        setTitle('');
        setUrl('');
      })
      .catch((error) => {
        console.error('Error adding video:', error);
      });
  };

  return (
    <div className="mb-3">
      <form onSubmit={handleAddVideo}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Video Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="url" className="form-label">Video URL</label>
          <input
            type="url"
            className="form-control"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Video</button>
      </form>
    </div>
  );
};

export default AddVideo;
