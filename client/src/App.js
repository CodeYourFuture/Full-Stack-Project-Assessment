import React,{ useState } from "react";
import "./App.css";
import  VideoCards   from "./VideoCards";
import  AddVideo  from "./AddVideo";
import data from './exampleresponse.json';


function App() {
  const [videos, setVideos] = useState(data);

  return (
    <div className="App">
      <header className="App-header">
      <a href="/index.html" alt="Play button animation" className="play-btn">
          .
        </a>
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo videos={videos} setVideos={setVideos} />
      <VideoCards videos={videos} setVideos={setVideos} />

    </div>
  );
}

export default App;
