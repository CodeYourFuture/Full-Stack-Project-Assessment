import "./App.css";
import React, { useEffect, useState } from "react";
import Video from "./Video";
import AddVideo from "./AddVideo";
<<<<<<< HEAD
=======
//import { videosData } from "./Data";
>>>>>>> 6c24e33e (installed CORS, made Fetch for all videos)

const App = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchAllVideos();
  }, []);
<<<<<<< HEAD
  const fetchAllVideos = async () => {
    try {
      const response = await fetch("http://localhost:5000/videos");
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
      const response = await fetch("http://localhost:5000/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      });
      if (!response.ok) {
        throw Error(`Failed to add video. Error: ${response.status}`);
      }
      const data = await response.json();
      setVideos([...videos, { ...newVideo, id: data.id }]);
    } catch (error) {}
  };

  const handleDeleteVideo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/videos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Video not found!");
      }
      setVideos(videos.filter((video) => video.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };
=======
const fetchAllVideos = async () => {
    try {
      const response = await fetch(
        "https://full-stack-project-video-reccomendations.onrender.com"
      );
      if (!response.ok) {
        throw Error(
          `The fetching of videos was not successful. Error: ${response.status}`
        );
      }
      const data = await response.json();
      setVideos (data);
    } catch (error) {
    }
  };
  
  //const handleAddVideo = (newVideo) => {};
>>>>>>> 6c24e33e (installed CORS, made Fetch for all videos)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      {videos.map((video) => (
        <Video key={video.id} video={video} onDeleteVideo={handleDeleteVideo} />
      ))}
      {/* <AddVideo onAddVideo={handleAddVideo} /> */}
    </div>
  );
};

export default App;
