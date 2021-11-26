import React, { useState } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import data from "./exampleresponse.json";


const App = () => {
  const [videoData, setVideoData] = useState(data);
  return (
    <div className="App">
      <header className="card text-white bg-info mt-2 pt-2" style={{ height: '80px' }} >
        <h1>Video Recommendation</h1>
      </header>
      <VideoCard videoData={videoData}/>
    </div>
  );
}

export default App;
