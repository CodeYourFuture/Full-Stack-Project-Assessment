import React, { useState } from "react";
import "./App.css";
import initialVideos from "./exampleresponse.json";
import AddVideos from "./AddVideos";
import VideoInfo from "./VideoInfo";

function App() {
  const [videos, setVideos] = useState(initialVideos);

  const [toggleArea, setToggleArea] = useState(false);

  const toggleShow = () => setToggleArea((s) => !s);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideos setVideos={setVideos} />
      <button onClick={toggleShow}>Show Videos</button>
      {toggleArea &&
        videos.map((video) => (
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
