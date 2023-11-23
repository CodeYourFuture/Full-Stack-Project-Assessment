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
      const response = await fetch("https://elena-videos.raccoon.space/videos");
      if (!response.ok) {
        throw Error(`Failed to fetch. Error: ${response.status}`);
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddVideo = async (title, url, clearForm) => {
    try {
      const response = await fetch(
        "https://elena-videos.raccoon.space/videos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, url, rating: 0 }),
        }
      );
      if (!response.ok) {
        throw Error(`Failed to add video. Error: ${response.status}`);
      }
      await fetchAllVideos();
      clearForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteVideo = async (id) => {
    try {
      const response = await fetch(
        `https://elena-videos.raccoon.space/videos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Video not found!");
      }
      await fetchAllVideos();
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
