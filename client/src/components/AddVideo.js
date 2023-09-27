import React, { useState } from 'react';

const AddVideo = () => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    setTitle('');
    setUrl('');

const handleSubmit = e => {
    e.preventDefault();
    AddVideo({ title,url });
    setTitle('');
    setUrl('');
};    

    
    return (
        <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>URL:</label>
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Video</button>
    </form>
    )
};

export default AddVideo;
