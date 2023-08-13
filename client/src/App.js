import React, { useState } from "react";
import "./App.css";
import samples from "./exampleresponse.json";
import Videocard from "./Videocard";
import AddingItem from "./AddingItem";

function App() {
  const [videos, setVideos] = useState(samples);

  const addVideo = (newVideo) => {
    setVideos([...videos, newVideo]);
  };

  const upVote = (video) => {
    const updatedVideos = videos.map((v) =>
      v === video ? { ...v, rating: v.rating + 1 } : v
    );
    setVideos(updatedVideos);
  };

  const downVote = (video) => {
    const updatedVideos = videos.map((v) =>
      v === video ? { ...v, rating: v.rating - 1 } : v
    );
    setVideos(updatedVideos);
  };

  const removeVideo = (video) => {
    const updatedVideos = videos.filter((v) => v !== video);
    setVideos(updatedVideos);
  };

  return (
    <div className="container-fluid">
      <header className="header">
        <h1>Video Recommendation</h1>
      </header>
      <AddingItem addVideo = {addVideo} id={videos.length}/>
      <div className="video-container">
        {videos.sort((a, b) => b.rating - a.rating).map((video) => (
          <Videocard
            key={video.id}
            video={video}
            onUpVote={upVote}
            onDownVote={downVote}
            onRemove={removeVideo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
