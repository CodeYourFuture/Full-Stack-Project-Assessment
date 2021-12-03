import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import AddVideo from "./components/AddVideo";
import SearchBar from "./components/SearchBar";
import VideoCards from "./components/VideoCards";

const App = () => {
  const [videoData, setVideoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const searchVideoData = videoData.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    fetch("http://127.0.0.1:5000")
      .then((res) => res.json())
      .then((videoData) => setVideoData(videoData))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      <Header />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <AddVideo videoData={videoData} setVideoData={setVideoData} />
      <VideoCards
        searchVideoData={searchVideoData}
        videoData={videoData}
        setVideoData={setVideoData}
      />
    </div>
  );
};

export default App;
