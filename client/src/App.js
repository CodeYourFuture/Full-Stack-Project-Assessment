import { useState } from "react";
import { AddVideo } from "./AddVideo";
import "./App.css";
import { VideosCards } from "./VideosCards";
import data from "./exampleresponse.json";

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
      <VideosCards videos={videos} setVideos={setVideos} />
    </div>
  );
}

export default App;
