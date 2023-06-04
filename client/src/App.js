import React, { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import Video from "./Components/Video";
import Header from "./Components/Header";
import Data from "./Components/exampleresponse.json";

function App() {
  const [videos, setVideos] = useState(Data);

  const handleAddVideo = (newVideo) => {
    setVideos([...videos, newVideo]);
  };

  const handleDelete = (id) => {
    const updatedVideos = videos.filter((video) => video.id !== id);
    setVideos(updatedVideos);
  };

  return (
    <div className="App">
      <Header />
      <Form onAddVideo={handleAddVideo} />
      <Video videos={videos} onDelete={handleDelete} />
    </div>
  );
}

export default App;
