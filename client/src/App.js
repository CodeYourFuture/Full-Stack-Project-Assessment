import React, { useState } from 'react';
import VideoList from './VideoList';
import AddVideoForm from './AddVideoForm';

const App = () => {
  const [videos, setVideos] = useState([]); 

  const handleVote = (video, isUpVote) => {
    setVideos((prevVideos) => {
      const updatedVideos = prevVideos.map((v) => {
        if (v.id === video.id) {
          return {
            ...v,
            votes: isUpVote ? v.votes + 1 : v.votes - 1,
          };
        }
        return v;
      });
      return updatedVideos;
    });
  };

  const handleRemove = (video) => {
    setVideos((prevVideos) => prevVideos.filter((v) => v.id !== video.id));
  };

  const handleAdd = (newVideo) => {
    setVideos((prevVideos) => [...prevVideos, newVideo]);
  };

  return (
    <div className="app">
      <h1>Video List</h1>
      <VideoList videos={videos} onVote={handleVote} onRemove={handleRemove} />
      <h2>Add Video</h2>
      <AddVideoForm onAdd={handleAdd} />
    </div>
  );
};

export default App;
