import React, { useState }  from "react";
import "./App.css";
import AddVideos from "./component/AddVideos";
import VideoList from "./component/VideoList";
import exampleData from "./data/exampleresponse.json";


function App() {
 const [videodata, setVideoData] = useState(exampleData)
 
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideos videodata={videodata} setVideoData={setVideoData} />
      <VideoList videodata={videodata} setVideoData={setVideoData} />
    </div>
  );
}

export default App;
