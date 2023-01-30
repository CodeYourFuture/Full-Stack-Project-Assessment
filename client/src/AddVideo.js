import React, { useState } from 'react';

const AddVideo = ({ addVideo }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addVideo({ title, url });
    setTitle('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        TITLE &nbsp;
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <br />
      <label>
        URL &nbsp;
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>
      <br />
      <button type="submit">Add Video</button>
    </form>
  );
};

export default AddVideo;