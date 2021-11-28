import React, { useState, useEffect } from "react";
import "./App.css";
import exampleVideos from "./exampleresponse.json";
import VideoCard from "./components/VideoCard";
import VideoAdd from "./components/VideoAdd";
import fetchVideos from "./utils/fetchVideos";

function App() {
  const [videos, setVideos] = useState(exampleVideos);

  useEffect(() => {
    fetchVideos("", setVideos);
  }, []);

  function searchVideos(event) {
    const searchKey = event.target.value.toLowerCase();
    const searchedVideos = exampleVideos.filter((video) =>
      video.title.toLowerCase().includes(searchKey)
    );
    setVideos(searchedVideos);
  }
  return (
    <div className="App">
      <VideoAdd setVideos={setVideos} />
      <input
        id="searchVideos"
        type="text"
        placeholder="Search video..."
        // value={title}
        onChange={searchVideos}
      />
      <VideoCard videos={videos} setVideos={setVideos} />
    </div>
  );
}

export default App;
