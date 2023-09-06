// AddVideoComponent.js
import React, { useState } from 'react';

const AddVideoComponent = ({ addVideo }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleAddVideo = () => {
    if (title && url) {
      const newVideo = {
        id: Date.now(),
        title,
        url,
        votes: 0,
      };

      addVideo(newVideo);

      setTitle('');
      setUrl('');
    }
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

export default AddVideoComponent;
