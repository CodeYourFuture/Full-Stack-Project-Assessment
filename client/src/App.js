import React, { useState, useEffect } from "react";
import AddVideoForm from "./components/AddVideoForm";
import Video from "./components/Video";
import Header from "./components/Header";
import "./App.css";
import "./components/AddVideoForm.css";

const App = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await fetch("http://localhost:5000/videos");
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  const handleAddVideo = async (newVideo) => {
    try {
      const res = await fetch("http://localhost:5000/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      });
      const data = await res.json();
      setVideos((prevVideos) => [...prevVideos, { ...newVideo, id: data.id }]);
    } catch (err) {
      console.log("Error adding video:", err);
    }
  };

  const handleUpVote = async (videoId) => {
    try {
      await fetch(`http://localhost:5000/videos/${videoId}/upvote`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video.id === videoId ? { ...video, rating: video.rating + 1 } : video
        )
      );
    } catch (err) {
      console.log("Error upvoting video:", err);
    }
  };

  const handleDownVote = async (videoId) => {
    try {
      await fetch(`http://localhost:5000/videos/${videoId}/downvote`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video.id === videoId ? { ...video, rating: video.rating - 1 } : video
        )
      );
    } catch (err) {
      console.log("Error downvoting video:", err);
    }
  };

  const handleRemoveVideo = async (videoId) => {
    try {
      await fetch(`http://localhost:5000/videos/${videoId}`, {
        method: "DELETE",
      });
      setVideos((prevVideos) =>
        prevVideos.filter((video) => video.id !== videoId)
      );
    } catch (err) {
      console.log("Error removing video:", err);
    }
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
          rating={video.rating}
          onUpVote={() => handleUpVote(video.id)}
          onDownVote={() => handleDownVote(video.id)}
          onRemove={() => handleRemoveVideo(video.id)}
        />
      ))}
    </div>
  );
};

export default App;
