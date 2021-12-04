import "./App.css";
import React, { useState } from "react";
import AddVideo from "./components/AddVideo";
import Header from "./components/Header";
import Search from "./components/Search";
import VideoCards from "./components/VideoCards";
import VideosData from "./components/exampleresponse.json";

function App() {
  const [videos, setVideos] = useState(VideosData);
  return (
    <div className="App">
      <Header />
      <div className="add-search-section">
        <AddVideo />
        <Search videos={videos} setVideos={setVideos} />
      </div>
      <div className="videosContainer">
        <VideoCards videos={videos} setVideos={setVideos} />
      </div>
    </div>
  );
}

export default App;
