import "./App.css";
import React, { useState } from "react";
import VideoCards from "./VideoCards";
import AddVideo from "./AddVideo";
import data from "./exampleresponse.json";


function App() {
let [videos, setVideos] = useState(data);

let addVideo = (video) => {
    setVideos([...videos, video]);
  }
  
  return (
    
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo addVideo={addVideo}/>
      <VideoCards videoList={videos} />
    </div>
  );
}

export default App;
