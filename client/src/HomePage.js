import React, { useEffect, useState } from "react";
import VideoComponent from "./VideoComponent";
import "./VideoComponent.css";
import AddVideoForm from "./AddVideoForm";

function HomePage ({onAddVideo}) {
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
    };

  return (
    <div>
      <section className="hero">
        <header>
          <h1>Music Video Recommendation</h1>
        </header>
        <AddVideoForm onAddVideo={handleAddVideo} />
      </section>
      <button className="order-button" onClick={handleOrder}>
        Toggle Order
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
    </div>
  );
}

export default HomePage
