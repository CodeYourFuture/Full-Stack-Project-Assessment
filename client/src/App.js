import React, { useState } from "react";
import "./App.css";
import videosData from "./exampleresponse.json";
import VideoComponent from "./VideoComponent";

function App() {
  const [videos, setVideos] = useState(videosData);
  const handleRemove = (videoId) => {
    setVideos(videos.filter((video) => video.id !== videoId));
  };

  return (
    <div className="App">
      {videos.map((video) => (
        <VideoComponent key={video.id} video={video} onRemove={handleRemove} />
      ))}
    </div>
  );
}

export default App;
