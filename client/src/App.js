import "./App.css";
import React, { useState, useEffect } from "react";
import VideoList from "./VideoList";
import NewVideoForm from "./NewVideoForm";
import videoData from "./exampleresponse";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(videoData);
  }, []);

  function handleDelete(videoId) {
    setVideos((prevVideos) => {
      return prevVideos.filter((video) => video.id !== videoId);
    });
  }

  function handleAdd(newVideo) {
    setVideos((prevVideos) => {
      return [newVideo, ...prevVideos];
    });
  }

  function handleVote(videoId, value) {
    setVideos((prevVideos) => {
      return prevVideos.map((video) => {
        if (video.id === videoId) {
          return { ...video, rating: video.rating + value };
        } else {
          return video;
        }
      });
    });
  }
  return (
    <div className="container mt-5">
      <h1 className="text-center">Video App</h1>
      <div class="text-center">
        <NewVideoForm onAdd={handleAdd} />
      </div>
      <div class="album py-5 bg-body-tertiary">
        <div className="container">
          <VideoList videos={videos} onVote={handleVote} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;
