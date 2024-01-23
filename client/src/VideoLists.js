import React, { useEffect, useState } from 'react';
import AddVideo from './AddVideo';
import Videocard from './VideoCard';


import config from './config';


const backendUrl = config.REACT_APP_BACKEND_URL;

console.log('REACT_APP_BACKEND_URL:', `${backendUrl}/videos`);

const VideoLists = () => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
     const fetchVideos = 
      async () => {
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
      <div>
        {videos.map(video => (
          <Videocard
            key={video.id}
            video={video}
            removeVideo={removeVideo}
            upVote={upVote}
            downVote={downVote}
          />
        ))}
        <AddVideo addVideo={addVideo} />
      </div>
    );
  };
  export default VideoLists;