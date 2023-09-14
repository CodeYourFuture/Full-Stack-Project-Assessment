import React, { useState, useEffect } from 'react';
import YouTubeVideo from './YoutubeVideo';
import AddVideo from './AddVideo';
const baseUrl = 'http://127.0.0.1:5000';
const videosEndpoint = `${baseUrl}/videos`;

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [order, setOrder] = useState('desc'); // Default to descending

    useEffect(() => {
    // Fetch data from the API
    fetch(videosEndpoint)
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [order]);

    const toggleOrder = () => {
    // Toggle the order between 'asc' and 'desc'
    const newOrder = order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder);
  };

  const handleUpVote = (videoId) => {

    const updatedVideos = videos.map((video) =>
      video.id === videoId ? { ...video, votes: video.votes + 1 } : video
    );
    setVideos(updatedVideos);
  };

  const handleDownVote = (videoId) => {
    
    const updatedVideos = videos.map((video) => {
    if (video.id === videoId) {
      // Ensure that the vote count doesn't go below zero
      const newVotes = Math.max(0, video.votes - 1);
      return { ...video, votes: newVotes };
    }
    return video;
  });
  setVideos(updatedVideos);
};

const handleAddVideo = (newVideo) => {
  // Add the new video to the list with the current timestamp locally
  const updatedVideosLocally = [...videos, { ...newVideo, uploadDate: new Date() }];
  setVideos(updatedVideosLocally);

  // POST request to the API to add the new video
  fetch(videosEndpoint, {
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
      // Handle the response, which may include the new video ID
      console.log('New video ID:', data.id);

    })
    .catch((error) => {
      console.error('Error posting data:', error);
      // Handle the error, e.g., display an error message to the user
    });
};


  // Order the videos by the number of upvotes (descending order)
  const orderedVideos = [...videos].sort((a, b) => {
    if (order === 'asc') {
      return a.votes - b.votes;
    } else {
      return b.votes - a.votes;
    }
  });

    return (
    <div className="videos">
      <AddVideo onAddVideo={handleAddVideo} />

      <h2>Most popular Videos</h2>
      <button onClick={toggleOrder}>
        Order by {order === 'asc' ? 'Ascending' : 'Descending'}
      </button>
      {orderedVideos.map((video) => (
        <div key={video.id}>
          <h3>{video.title}</h3>
          <p>Uploaded on: {new Date(video.uploadDate).toLocaleString()}</p>
          <YouTubeVideo videoId={video.youtubeVideoId} />
          <p>Votes: {video.votes}</p>
          <button onClick={() => handleUpVote(video.id)}>Up Vote</button>
          <button onClick={() => handleDownVote(video.id)}>Down Vote</button>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
