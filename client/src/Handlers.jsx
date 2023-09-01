import React, { useState } from 'react';
import AddVideoForm from './AddVideoForm';
import videosData from './videosData';
import VideoList from './VideoList';


function Handlers({ video, onUpVote, onDownVote, onDelete }) {
  const [videos, setVideos] = useState(videosData); 

  const handleVote = (id, type) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id === id) {
          return {
            ...video,
            rating: type === "up" ? video.rating + 1 : video.rating - 1,
          };
        }
        return video;
      })
    );
  };

  const handleDelete = (id) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
  };

  const handleAdd = (newVideo) => {
    setVideos((prevVideos) => [
      ...prevVideos,
      { ...newVideo, id: Date.now(), rating: 0 },
    ]);
  };
  return (
    <div>
      <AddVideoForm onAddVideo={handleAdd}/>
      <VideoList videos={videos} onVote={handleVote} onDelete={handleDelete} />
    </div>
  )
}

export default Handlers;