import "./App.css";
import { VideoCards } from "./VideoCards";
import { AddVideo } from "./AddVideo";
import { useState } from "react";
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
    </div>
  );
}

export default App;
