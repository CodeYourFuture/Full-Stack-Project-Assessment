import React, { useEffect, useState } from "react";
import VideoComponent from "./VideoComponent";
import "./VideoComponent.css";
import AddVideoForm from "./AddVideoForm";

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [order, setOrder] = useState("Desc");

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

  const handleOrderAscending = () => {
    if (order === "Desc") {
      setOrder("Asc");
      setVideos((prev) => prev.sort((a, b) => a.rating - b.rating));
    }
  };

  const handleOrderDescending = () => {
    if (order === "Asc") {
      setOrder("Desc");
      setVideos((prev) => prev.sort((a, b) => b.rating - a.rating));
    }
  };

  return (
    <div>
      <section className="hero">
        <header>
          <h1>Music Video Recommendation</h1>
        </header>
        <AddVideoForm onAddVideo={handleAddVideo} />
      </section>
      <button className="order-button" onClick={handleOrderAscending}>
        Ascending Order
      </button>
      <button className="order-button" onClick={handleOrderDescending}>
        Descending Order
      </button>
      {videos.map((video) => (
        <VideoComponent
          key={video.id}
          video={video}
          onRemove={handleRemoveVideo}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
        />
      ))}
      <footer className="footer">
        <p>&copy; 2023 Ying Xing. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
