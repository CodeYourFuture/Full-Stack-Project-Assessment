import React, { useState } from 'react';
import './AddVideo.css';
import axios from 'axios'; // Import axios for making HTTP requests

function AddVideo({ onAdd }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (title && url) {
      try {
        // Create a new video object
        const newVideo = {
          title,
          url,
        };
  
        // Make a POST request to your server to add the video to the database
        const response = await axios.post('http://localhost:7000/', newVideo);
  
        console.log("Server response:", response.data); // Debugging line
  
        // If the video is added successfully on the server, update the client-side state
        if (response.status === 201) {
          onAdd(response.data); // Assuming response.data contains the new video data
          setTitle('');
          setUrl('');
  
          // Reload the page
          window.location.reload();
        } else {
          console.error('Failed to add video');
        }
      } catch (error) {
        console.error('Error adding video:', error);
      }
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
