
import React, { useEffect, useState } from 'react';
import VideoComponent from './VideoComponent';
import AddVideoComponent from './AddVideoComponent';

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
     const fetchVideos = async () => {
        try {
          const response = await fetch('/videos');
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
          <VideoComponent
            key={video.id}
            video={video}
            removeVideo={removeVideo}
            upVote={upVote}
            downVote={downVote}
          />
        ))}
        <AddVideoComponent addVideo={addVideo} />
      </div>
    );
  };
  export default VideoList;