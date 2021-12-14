import React, { useState } from "react";
import "./App.css";
import data from "./exampleresponse.json";
import Header from "./components/Header";
import AddVideo from "./components/AddVideo";
import SearchBar from "./components/SearchBar";
import VideoCards from "./components/VideoCards";

const App = () => {
  const [videoData, setVideoData] = useState(data);

  return (
    <div className="App">
      <Header />
      <SearchBar videoData={videoData} setVideoData={setVideoData} />
      <AddVideo videoData={videoData} setVideoData={setVideoData} />
      {videoData.map((video, index) => (
        <VideoCards
          videoData={videoData}
          key={index}
          setVideoData={setVideoData}
        />
      ))}
      {/* <VideoCards videoData={videoData} setVideoData={setVideoData} /> */}
    </div>
  );
};

export default App;
