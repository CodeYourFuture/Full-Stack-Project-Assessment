import React, { useState} from "react";
import "./App.css";
import videosData from "./exampleresponse.json"
import VideoCard from "./VideoCard";
import AddVideo from "./AddVideo";



function App() {
 
  const [videos, setVideos] = useState(videosData);
//  let [addedVideos, setAddedVideos] = useState({});

 
 

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo setVideos={setVideos}  />
      <VideoCard videos={videos} setVideos={setVideos} />
      
    </div>
  );
}

export default App;
