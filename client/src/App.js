import "./App.css";
import React, { useState, useEffect } from "react";
import VideoList from "./VideoList";
import NewVideoForm from "./NewVideoForm";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:5000/"); // Update the endpoint
        if (response.ok) {
          const data = await response.json();
          setVideos(data);
        } else {
          console.error("Error fetching videos");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideos();
  }, []);

  const handleAdd = async (video) => {
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(video),
      });

      const newVideo = await response.json();
      setVideos((prev) => [...prev, newVideo]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (videoId) => {
    try {
      await fetch(`http://localhost:5000/${videoId}`, {
        method: "DELETE",
      });

      setVideos((prev) => prev.filter((v) => v.id !== videoId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleVote = async (videoId, value) => {
    try {
      const response = await fetch(`http://localhost:5000/${videoId}/vote`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
      });

      if (response.ok) {
        const data = await response.json();
        setVideos((prevVideos) => prevVideos.map((video) => (video.id === videoId ? data : video)));
      } else {
        console.error("Error updating vote count");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Video App</h1>
      <div className="text-center">
        <NewVideoForm onAdd={handleAdd} />
      </div>
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <VideoList videos={videos} onVote={handleVote} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;
