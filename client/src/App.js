import React, { useState } from "react";
import VideoList from "./VideoList";
import AddVideoForm from "./AddVideoForm";
import videoData from "./exampleresponse.json";
import "./App.css";

const App = () => {
  const [videos, setVideos] = useState(videoData);
  const handleUpVote = (videoId) => {
    setVideos((oldVideos) =>
      oldVideos.map((video) =>
        video.id === videoId ? { ...video, votes: video.votes + 1 } : video
      )
    );
  };
  const handleDownVote = (videoId) => {
    setVideos((oldVideos) =>
      oldVideos.map((video) =>
        video.id === videoId ? { ...video, votes: video.votes - 1 } : video
      )
    );
  };
  const handleRemoveVideo = (videoId) => {
    setVideos((oldVideos) => oldVideos.filter((video) => video.id !== videoId));
  };

  const handleAddVideo = (newVideo) => {
    setVideos((oldVideos) => [...oldVideos, newVideo]);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <VideoList
          videos={videos}
          onUpVote={handleUpVote}
          onDownVote={handleDownVote}
          onRemove={handleRemoveVideo}
        />
        <AddVideoForm onAddVideo={handleAddVideo} />
      </header>
    </div>
  );
};

export default App;
