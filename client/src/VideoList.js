
import React, { useState } from 'react';
import VideoComponent from './VideoComponent';
import AddVideoComponent from './AddVideoComponent';

const initialVideos = [{
    "id": 523523,
    "title": "Never Gonna Give You Up",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "rating": 23
  },
  {
    "id": 523427,
    "title": "The Coding Train",
    "url": "https://www.youtube.com/watch?v=HerCR8bw_GE",
    "rating": 230
  },
  {
    "id": 82653,
    "title": "Mac & Cheese | Basics with Babish",
    "url": "https://www.youtube.com/watch?v=FUeyrEN14Rk",
    "rating": 2111
  },
  {
    "id": 858566,
    "title": "Videos for Cats to Watch - 8 Hour Bird Bonanza",
    "url": "https://www.youtube.com/watch?v=xbs7FT7dXYc",
    "rating": 11
  },
  {
    "id": 453538,
    "title": "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
    "url": "https://www.youtube.com/watch?v=4As0e4de-rI",
    "rating": 3211
  },
  {
    "id": 283634,
    "title": "Learn Unity - Beginner's Game Development Course",
    "url": "https://www.youtube.com/watch?v=gB1F9G0JXOo",
    "rating": 211
  },
  {
    "id": 562824,
    "title": "Cracking Enigma in 2021 - Computerphile",
    "url": "https://www.youtube.com/watch?v=RzWB5jL5RX0",
    "rating": 111
  },
  {
    "id": 442452,
    "title": "Coding Adventure: Chess AI",
    "url": "https://www.youtube.com/watch?v=U4ogK0MIzqk",
    "rating": 671
  },
  {
    "id": 536363,
    "title": "Coding Adventure: Ant and Slime Simulations",
    "url": "https://www.youtube.com/watch?v=X-iSQQgOd1A",
    "rating": 76
  },
  {
    "id": 323445,
    "title": "Why the Tour de France is so brutal",
    "url": "https://www.youtube.com/watch?v=ZacOS8NBK6U",
    "rating": 73
  }
]

  
const VideoList = () => {
    const [videos, setVideos] = useState(initialVideos);
  
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