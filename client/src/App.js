import React, { useState } from "react";
import VideoList from "./components/VideoList";
import AddVideoForm from "./components/AddVideoForm";
import "./App.css";

function extractVideoId(url) {
  // Extract the video ID from the YouTube URL
  // Implement this function according to your requirements
  // Example implementation:
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 1];
}

function App() {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Video 1",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      votes: 0,
    },
    {
      id: 2,
      title: "Video 2",
      url: "https://www.youtube.com/embed/K4DyBUG242c",
      votes: 0,
    },
    {
      id: 3,
      title: "Video 3",
      url: "https://www.youtube.com/embed/tgbNymZ7vqY",
      votes: 0,
    },
  ]);

  const handleAddVideo = (title, url) => {
    const videoId = extractVideoId(url);
    const newVideo = {
      id: videos.length + 1,
      title,
      url: `https://www.youtube.com/embed/${videoId}`,
      votes: 0,
    };
    setVideos([...videos, newVideo]);
  };

  const handleVote = (videoId, increment) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId
          ? { ...video, votes: video.votes + increment }
          : video
      )
    );
  };

  const handleRemoveVideo = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.filter((video) => video.id !== videoId)
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="container">
        <VideoList
          videos={videos}
          handleVote={handleVote}
          handleRemove={handleRemoveVideo}
        />
        <AddVideoForm handleAddVideo={handleAddVideo} />
      </div>
    </div>
  );
}

export default App;
