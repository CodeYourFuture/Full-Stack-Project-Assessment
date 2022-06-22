import React, { useState } from "react";
import "./App.css";
import videosData from "./exampleresponse.json"
import VideoCard from "./VideoCard";


function App() {
  const [videos, setVideos] = useState (videosData)

    function removeVideo(id) {
       let newVideoList = videos.filter((video) => video.id !=id);
       setVideos(newVideoList);
    }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <VideoCard data={videosData}/>
    </div>
  );
}

export default App;
