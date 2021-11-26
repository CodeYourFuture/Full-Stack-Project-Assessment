import React, { useState } from "react";
import "./App.css";
import exampleVideos from "./exampleresponse.json";
import VideoCard from "./components/VideoCard";
import VideoAdd from "./components/VideoAdd";

function App() {
  const [videos, setVideos] = useState(exampleVideos);
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
