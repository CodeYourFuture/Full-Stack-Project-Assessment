import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import AddVideo from "./components/AddVideo";
import VideoCards from "./components/VideoCards";

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);
  const handleAddVideo = (newVideo) => {
    setVideos([newVideo, ...videos]);
  };

  const handleRemove = (title) => {
    const updatedVideos = videos.filter((video) => video.title !== title);
    setVideos(updatedVideos);
  };

  return (
    <div className="App">
      <Header />
      <AddVideo onAddVideo={handleAddVideo} />
      <VideoCards videos={videos} onRemove={handleRemove} />
    </div>
  );
}

export default App;
