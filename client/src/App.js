import "./App.css";
import React, { useEffect, useState } from "react";
import Video from "./Video";
import AddVideo from "./AddVideo";
//import { videosData } from "./Data";

const App = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchAllVideos();
  }, []);
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      {videos.map((video) => (
        <Video
          key={video.id}
          video={video}
          />
      ))}
      {/* <AddVideo onAddVideo={handleAddVideo} /> */}
    </div>
  );
};

export default App;
