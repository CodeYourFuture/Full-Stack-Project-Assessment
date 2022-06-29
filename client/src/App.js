import React, { useState} from "react";
import "./App.css";
import videosData from "./exampleresponse.json"
import VideoCard from "./VideoCard";
import AddVideo from "./AddVideo";
import Header from "./Header";
import Footer from "./Footer";



function App() {
 
  const [videos, setVideos] = useState(videosData);
//  let [addedVideos, setAddedVideos] = useState({});

 
 

  return (
    <div className="App">
      <Header />
      <AddVideo setVideos={setVideos}  />
      <VideoCard videos={videos} setVideos={setVideos} />
      <Footer />
    </div>
  );
}

export default App;
