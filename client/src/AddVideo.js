import React, { useState } from 'react';
import config from './config.js';


const AddVideo = ({ addVideo }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleAddVideo = () => {
    const newVideo = {
      title:title,
      url:url,
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
      setTitle('');
      setUrl('');
      addVideo({ ...newVideo, id: data.id }); 
    })
    .catch((error) => {
      console.error('Error adding video:', error);
    });
};

  return (
    <div className='add-video'>
      <h2>Add a New Video</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleAddVideo}>Add Video</button>
    </div>
  );
};

export default AddVideo;
