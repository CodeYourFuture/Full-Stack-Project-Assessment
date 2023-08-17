import "./App.css";
import React, { useState } from "react";
import videoData from "./exampleresponse.json";
import VideoList from "./VideoList";
import AddVideoForm from "./AddVideoForm";
import Searchbar from "./Searchbar";

function App() {
  const [videos, setVideos] = useState(videoData);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div>
        <AddVideoForm />
        <Searchbar />
      </div>
      <div className="video--container">
        <VideoList videos={videos} />
      </div>
    </div>
  );
}

export default App;
