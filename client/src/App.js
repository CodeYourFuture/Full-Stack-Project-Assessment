import React, { useState, useEffect } from "react";
import "./App.css";
import exampleVideos from "./exampleresponse.json";
import VideoCard from "./components/VideoCard";
import VideoAdd from "./components/VideoAdd";
import fetchVideos from "./utils/fetchVideos";

function App() {
  const [videos, setVideos] = useState(exampleVideos);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredVideos = videos.filter((video) =>
    video.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    fetchVideos("", setVideos);
  }, []);

  return (
    <div className="App">
      <VideoAdd setVideos={setVideos} />
      <input
        id="searchVideos"
        type="text"
        placeholder="Search video..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <VideoCard
        videos={filteredVideos}
        setVideos={setVideos}
      />
    </div>
  );
}

export default App;
