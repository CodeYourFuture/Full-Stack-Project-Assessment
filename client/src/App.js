import React, { useState } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import data from "./exampleresponse.json";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [videoData, setVideoData] = useState(data);
  // console.log(videoData);
  return (
    <div className="App">
      <Header />
      <Search videoData={videoData} setVideoData={setVideoData} />
      {/* <AddVideo setVideos={setVideoData} setVideoData={setVideoData} /> */}
      <VideoCard videoData={videoData} setVideoData={setVideoData} />
    </div>
  );
};

export default App;
