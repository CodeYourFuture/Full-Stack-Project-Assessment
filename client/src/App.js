import React, { useState } from "react";
import "./App.css";
import VideoList from "./VideoList";
import VideoForm from "./VideoForm";
import exampleVideos from "./exampleresponse.json";

const App = () => {
  const [videos, setVideos] = useState(exampleVideos); // Your video data here

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
    <div className="App">
      <h1>Video Recommendation</h1>
      <VideoForm onAdd={handleAdd} />
      <VideoList videos={videos} onVote={handleVote} onDelete={handleDelete} />
    </div>
  );
};

export default App;
