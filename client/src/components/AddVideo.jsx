import React, { useState } from 'react';

const AddVideo = ({ onAddVideo }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const getYouTubeVideoIdFromUrl = (url) => {
    // Define patterns for different YouTube URL formats
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/,
    ];

    // Iterate through patterns and try to match with the given URL
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1]; // Return the video ID
      }
    }

    // If no match is found, return null
    return null;
  };

  const handleAddVideo = () => {
    if (title.trim() === '' || !isValidYouTubeUrl(url)) {
      alert('Please enter a valid title and a valid YouTube URL.');
      return;
    }

    // Validate if the URL is a YouTube video URL and extract the video ID
    const videoId = getYouTubeVideoIdFromUrl(url);

    // Generate a unique ID using the current timestamp
    const newVideo = {
      id: Date.now(),
      title,
      youtubeVideoId: videoId,
      votes: 0,
      uploadDate: new Date(),
    };

    // Call the parent component's function to add the video
    onAddVideo(newVideo);

    // Reset the input fields
    setTitle('');
    setUrl('');
  };

  // Function to check if a string is a valid YouTube URL
  const isValidYouTubeUrl = (url) => {
    // Add your validation logic here
    // For a simple example, you can check if the URL includes 'youtube.com'
    return url.includes('youtube.com');
  };

  return (
    <div>
      <h2>Add a New Video</h2>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        YouTube URL:
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>
      <button onClick={handleAddVideo}>Add Video</button>
    </div>
  );
};

export default AddVideo;
