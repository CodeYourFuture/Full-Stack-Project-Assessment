import "./App.css";
import React from "react";
import YouTubeData from "./Data/YouTubeData.json";
import YouTubeVideos from "./Components/YouTubeVideos";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <YouTubeVideos YouTubeData={YouTubeData} />
    </div>
  );
}

export default App;
