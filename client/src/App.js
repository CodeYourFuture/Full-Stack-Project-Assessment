import React, { useEffect, useState } from "react";
import VideoComponent from "./VideoComponent";
import AddVideoForm from "./AddVideoForm";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/data")
      .then((response) => response.json())
      .then((data) => {
        // Order the videos by rating in descending order
        const sortedVideos = data.sort((a, b) => b.rating - a.rating);
        setVideos(sortedVideos);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(videos);

  const handleAddVideo = (newVideo) => {
    setVideos((prevVideos) => [...prevVideos, newVideo]);
  };

  const handleRemoveVideo = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.filter((video) => video.id !== videoId)
    );
  };

  const handleUpvote = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId ? { ...video, rating: video.rating + 1 } : video
      )
    );
  };

  const handleDownvote = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId ? { ...video, rating: video.rating - 1 } : video
      )
    );
  };

  return (
    <div className="App">
      <section className="hero">
        <header>
          <h1>Video Recommendation</h1>
        </header>
        <AddVideoForm onAddVideo={handleAddVideo} />
      </section>
      {videos.map((video) => (
        <VideoComponent
          key={video.id}
          video={video}
          onRemove={handleRemoveVideo}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
        />
      ))}
      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2023 Ying Xing. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
