import React, { useState } from 'react';
import './AddVideo.css';
import axios from 'axios'; 

function AddVideo({ onAdd }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (title && url) {
      try {
        
        const newVideo = {
          title,
          url,
        };

        
        const response = await axios.post('http://localhost:7000/', newVideo);
  
        console.log("Server response:", response.data); 
  
       
        if (response.status === 201) {
          onAdd(response.data); 
          setTitle('');
          setUrl('');
  
          
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
