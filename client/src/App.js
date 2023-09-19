import "./App.css";
import React, { useEffect, useState } from "react";
import Video from "./Video";
import AddVideo from "./AddVideo";

const App = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchAllVideos();
  }, []);

  const fetchAllVideos = async () => {
    try {
      const response = await fetch(
        "https://full-stack-project-video-reccomendations.onrender.com/videos"
      );
      if (!response.ok) {
        throw Error(`Failed to fetch. Error: ${response.status}`);
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {}
  };

  const handleAddVideo = async (newVideo) => {
    console.log(JSON.stringify(newVideo));
    try {
      const response = await fetch(
        "https://full-stack-project-video-reccomendations.onrender.com/videos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVideo),
        }
      );
      if (!response.ok) {
        throw Error(`Failed to add video. Error: ${response.status}`);
      }
      const data = await response.json();
      setVideos([...videos, { ...newVideo, id: data.id }]);
    } catch (error) {}
  };

  const handleDeleteVideo = async (id) => {
    try {
      const response = await fetch(
        `https://full-stack-project-video-reccomendations.onrender.com/videos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Video not found!");
      }
      setVideos(videos.filter((video) => video.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      {videos.map((video) => (
        <Video key={video.id} video={video} onDeleteVideo={handleDeleteVideo} />
      ))}
      <AddVideo onAddVideo={handleAddVideo} />
    </div>
  );
};

export default App;
