// // npm start
// //

import "./App.css";
import React, { useState, useEffect } from "react";
import VideoList from "./VideoList";
import NewVideoForm from "./NewVideoForm";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [videos, setVideos] = useState([]);
  // production server
  const serverUrl = "https://server-of-full-stack-project-assessment.onrender.com/";
  // local server
  // const serverUrl = "http://localhost:5000/";

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(serverUrl); // Update the endpoint
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

  const handleAdd = async (video) => {
    try {
      const response = await fetch(serverUrl, {
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
    // Refresh the video list after adding a new video
    fetchVideos();
  };

  const handleDelete = async (videoId) => {
    try {
      await fetch(`${serverUrl}${videoId}`, {
        method: "DELETE",
      });

      setVideos((prev) => prev.filter((v) => v.id !== videoId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleVote = async (videoId, voteType) => {
    try {
      const response = await fetch(`${serverUrl}${videoId}/rating?voteType=${voteType}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedVideo = await response.json();

      setVideos((prevVideos) => {
        return prevVideos.map((video) => {
          if (video.id === videoId) {
            return updatedVideo;
          } else {
            return video;
          }
        });
      });
    } catch (error) {
      console.error(error);
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
