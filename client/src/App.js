import React, { useState, useMemo } from "react";
import "./App.css";
import Form from "./Components/Form";
import Video from "./Components/Video";
import Header from "./Components/Header";
import Data from "./Components/exampleresponse.json";

function App() {
  const [videos, setVideos] = useState(Data);

  const handleAddVideo = (newVideo) => {
    const updatedVideos = [...videos, newVideo];
    updatedVideos.sort((a, b) => b.rating - a.rating); // Sort videos based on rating in descending order
    setVideos(updatedVideos);
  };

  const handleDelete = (id) => {
    const updatedVideos = videos.filter((video) => video.id !== id);
    setVideos(updatedVideos);
  };

  const sortedVideos = useMemo(() => {
    // Sort videos based on rating
    return [...videos].sort((a, b) => b.rating - a.rating);
  }, [videos]);

  return (
    <div className="App">
      <Header />
      <Form onAddVideo={handleAddVideo} />
      <Video videos={sortedVideos} onDelete={handleDelete} />
    </div>
  );
}

export default App;
