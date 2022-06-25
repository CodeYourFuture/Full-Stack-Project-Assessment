import React from "react";
import "./App.css";
import videosData from "./exampleresponse.json"
import VideoCard from "./VideoCard";
import AddVideo from "./AddVideo";



function App() {
 

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo videosData={videosData} />
      <VideoCard  />
      
    </div>
  );
}

export default App;
