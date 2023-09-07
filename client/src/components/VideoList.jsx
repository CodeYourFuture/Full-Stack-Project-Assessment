import React, { useState } from 'react';
import YouTubeVideo from './YoutubeVideo';
import AddVideo from './AddVideo';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  const handleAddVideo = (newVideo) => {
    // Add the new video to the list
    setVideos([...videos, newVideo]);
  };

    const handleUpVote = (videoId) => {
    const updatedVideos = videos.map((video) =>
      video.id === videoId ? { ...video, votes: video.votes + 1 } : video
    );
    setVideos(updatedVideos);
  };

  const handleDownVote = (videoId) => {
    const updatedVideos = videos.map((video) =>
      video.id === videoId ? { ...video, votes: video.votes - 1 } : video
    );
    setVideos(updatedVideos);
  };

  return (
    <div>
      <AddVideo onAddVideo={handleAddVideo} />
      <h2>List of Videos</h2>
      {videos.map((video) => (
        <div key={video.id}>
          <h3>{video.title}</h3>
          
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
