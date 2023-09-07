import React, { useState } from 'react';

const AddVideo = ({ onAddVideo }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [nextId, setNextId] = useState(1); // Initialize a counter for generating IDs

  const handleAddVideo = () => {
    // Validate if the URL is a YouTube video URL and extract the video ID
    const videoId = getYouTubeVideoIdFromUrl(url);

    if (videoId) {
      // Generate a unique ID using the counter
      const newVideo = {
        id: nextId, // Use the counter as the ID
        title,
        youtubeVideoId: videoId, // Extracted video ID
        votes: 0,
      };

      // Call the parent component's function to add the video
      onAddVideo(newVideo);

      // Increment the counter for the next ID
      setNextId(nextId + 1);

      // Reset the input fields
      setTitle('');
      setUrl('');
    } else {
      alert('Invalid YouTube video URL. Please enter a valid YouTube video URL.');
    }
  };

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
