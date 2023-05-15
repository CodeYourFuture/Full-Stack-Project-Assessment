import React, { useState } from "react";
import "./App.css";
import initialVideos from "./exampleresponse.json";
import AddVideos from "./AddVideos";
import VideoInfo from "./VideoInfo";

function App() {
  const [videos, setVideos] = useState(initialVideos);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideos setVideos={setVideos} />
      {videos.map((video) => (
        <VideoInfo
          key={video.id}
          video={video}
          videos={videos}
          setVideos={setVideos}
          initialVideos={initialVideos}
        />
      ))}
    </div>
  );
}

export default App;
