import React, { useState } from "react";
import "./App.css";
import exampleVideos from "./exampleresponse.json";
import VideoCard from "./components/VideoCard";
import VideoAdd from "./components/VideoAdd";

function App() {
  const [videos, setVideos] = useState(exampleVideos);

  return (
    <div className="App">
      <VideoAdd setVideos={setVideos} />
      <VideoCard videos={videos} setVideos={setVideos} />
    </div>
  );
}

export default App;
