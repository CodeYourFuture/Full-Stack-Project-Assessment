import React, { useState } from "react";
import AddVideoForm from "./components/AddVideoForm";
import videoData from "./exampleresponse.json";
import Video from "./components/Video";
import Header from "./components/Header";
import "./App.css";
import "./components/AddVideoForm.css";

const App = () => {
  const [videos, setVideos] = useState(
    videoData.map((video) => ({
      ...video,
      votes: video.rating || 0,
    }))
  );
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
    setVideos((oldVideos) => [...oldVideos, { ...newVideo, votes: 0 }]);
  };
  return (
    <div className="app">
      <Header />
      <AddVideoForm onAddVideo={handleAddVideo} />
      {videos.map((video) => (
        <Video
          key={video.id}
          title={video.title}
          url={video.url}
          votes={video.votes}
          onUpVote={() => handleUpVote(video.id)}
          onDownVote={() => handleDownVote(video.id)}
          onRemove={() => handleRemoveVideo(video.id)}
        />
      ))}
      ;
    </div>
  );
};

export default App;
