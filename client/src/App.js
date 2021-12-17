import "./App.css";
import React, { useState, useEffect } from "react";
import AddVideo from "./components/AddVideo";
import Header from "./components/Header";
import Search from "./components/Search";
import VideoCards from "./components/VideoCards";

function App() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(`Error: ${res.status}`);
        }
      })
      .then((videosJson) => {
        setVideos(videosJson);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="add-search-section">
        <AddVideo setVideos={setVideos} />
        <Search videos={videos} setVideos={setVideos} />
      </div>
      <ul className="videosContainer">
        <VideoCards videos={videos} setVideos={setVideos} />
      </ul>
    </div>
  );
}

export default App;
