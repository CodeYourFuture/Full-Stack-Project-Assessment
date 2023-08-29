import React, { useState, useEffect } from "react";
import "./App.css";
// import videosData from "./exampleresponse.json";
import VideoComponent from "./VideoComponent";
import AddVideo from "./AddVideo";

function App() {
  // const [videos, setVideos] = useState([]);

  const [videos, setVideos] = useState([]);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleRemove = (videoId) => {
    setVideos(videos.filter((video) => video.id !== videoId));
  };

  const handleAddVideo = () => {
    const newVideo = {
      id: videos.length + 1,
      title: newVideoTitle,
      url: newVideoUrl,
      votes: 0,
    };
    setVideos([...videos, newVideo]);
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="video title"
        value={newVideoTitle}
        onChange={(e) => setNewVideoTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="video url"
        value={newVideoUrl}
        onChange={(e) => setNewVideoUrl(e.target.value)}
      />

      <button onClick={handleAddVideo}>Add Video</button>

      {videos.map((video) => (
        <VideoComponent key={video.id} video={video} onRemove={handleRemove} />
      ))}
    </div>
  );
}

export default App;
