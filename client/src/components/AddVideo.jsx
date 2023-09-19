import React, { useState } from 'react';

const baseUrl = 'http://localhost:5000';
const videosEndpoint = `${baseUrl}/videos`;

const getYouTubeVideoIdFromUrl = (url) => {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1]; 
    }
  }

  return null;
};

const AddVideo = ({ onAddVideo }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleAddVideo = () => {
    if (title.trim() === '' || !isValidYouTubeUrl(url)) {
      alert('invalid');
      return;
    }

    fetch(videosEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        youtubeVideoId: getYouTubeVideoIdFromUrl(url),
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error('error');
        }
      })
      .then((data) => {
        onAddVideo(data);

        setTitle('');
        setUrl('');
      })
      .catch((error) => {
        console.error('error', error);
        alert('error');
      });
  };

  const isValidYouTubeUrl = (url) => {
    return url.includes('youtube.com');
  };

  return (
    <div className='addContainer'>
      <h2>Video ekleyin</h2>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        YouTube URL:
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>
      <button onClick={handleAddVideo}>Video Ekle</button>
    </div>
  );
};

export default AddVideo;
