import React, { useState, useEffect } from 'react';
import Videocard from './VideoCard';
import AddVideo from './AddVideo';
import config from './config'; 

const VideoLists = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${config.REACT_APP_BACKEND_URL}/videos`);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);

  const removeVideo = (videoId) => {
    const updatedVideos = videos.filter(video => video.id !== videoId);
    setVideos(updatedVideos);
  };

  const upVote = (videoId) => {
    const updatedVideos = videos.map(video => {
      if (video.id === videoId) {
        return { ...video, rating: video.rating + 1 };
      }
      return video;
    });
    setVideos(updatedVideos);
  };

  const downVote = (videoId) => {
    const updatedVideos = videos.map(video => {
      if (video.id === videoId) {
        return { ...video, rating: video.rating - 1 };
      }
      return video;
    });
    setVideos(updatedVideos);
  };

  const addVideo = (newVideo) => {
    setVideos([...videos, newVideo]);
  };

  return (
    <div className="container mt-4">
      <AddVideo addVideo={addVideo} />
      <div className="row">
        {videos.map(video => (
          <div className="col-md-4 mb-3" key={video.id}>
            <Videocard
              video={video}
              removeVideo={removeVideo}
              upVote={upVote}
              downVote={downVote}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoLists;