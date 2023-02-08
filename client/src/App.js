import "./App.css";
import React, { useState } from "react";
import VideoCards from "./VideoCards";
import AddVideo from "./AddVideo";
import data from "./exampleresponse.json";


function App() {
let [videos, setVideos] = useState(data);

function addVideo(video) {
    setVideos([...videos, video]);
  };

function removeVideo(id) {
    setVideos(videos.filter(video => video.id !== id));
    };
  
  return (
    
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo addVideo={addVideo}/>
      <VideoCards videoList={videos} removeVideo={removeVideo} />
    </div>
  );
}

export default App;
