import React, { useState } from "react";
import AddVideoForm from "./components/AddVideoForm";
import VideoCard from "./components/VideoCard";
import exampleresponse from "./data/exampleresponse.json";
import "./App.css";

const sortVideosByRating = (videos) =>
  videos.sort((v1, v2) => (v1.rating < v2.rating ? 1 : -1));

const deleteVideo = (id, initialVideos) =>
  initialVideos.filter((video) => video.id !== id);

let allVideos = sortVideosByRating([...exampleresponse]);

const App = () => {
  const [videos, setVideos] = useState(allVideos);

  const deleteAction = (id) => {
    setVideos(deleteVideo(id, videos));
  };

  return (
    <div className="App">
      <header className="App_header">
        <h1>Video Recommendation</h1>
        <AddVideoForm setVideos={setVideos} />
      </header>
      <div className="video_container">
        {videos.map((video) => (
          <VideoCard
            video={video}
            key={video.id}
            delVid={() => deleteAction(video.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
