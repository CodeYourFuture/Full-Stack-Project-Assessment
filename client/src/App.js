import React, { useEffect, useState } from "react";
import VideoComponent from "./VideoComponent";
import AddVideoForm from "./AddVideoForm";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [order, setOrder] = useState("Asc");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((response) => response.json())
      .then((data) => {
        // Order the videos by rating in descending order
        //const sortedVideos = data.sort((a, b) => b.rating - a.rating);
        setVideos(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(videos);
  console.log(order);

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

  const handleOrder = () => {
    setOrder((prev) => (prev === "Asc" ? "Desc" : "Asc"));
    if (order === "Asc")
      setVideos((prev) => prev.sort((a, b) => a.rating - b.rating));
    else setVideos((prev) => prev.sort((a, b) => b.rating - a.rating));
  }

  // useEffect (() => {
    
  // },[order]);

  return (
    <div className="App">
      <section className="hero">
        <header>
          <h1>Music Video Recommendation</h1>
        </header>
        <AddVideoForm onAddVideo={handleAddVideo} />
      </section>
      <button onClick={handleOrder}>{order}</button>
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
