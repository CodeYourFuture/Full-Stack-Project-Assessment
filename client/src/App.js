import React, { useState, useEffect } from "react";
import "./App.css";
import AddVideos from "./AddVideos";
import VideoInfo from "./VideoInfo";

function App() {
  const [videos, setVideos] = useState([]);

  const [toggleArea, setToggleArea] = useState(false);

  const toggleShow = () => setToggleArea((s) => !s);

  function getAllVideos() {
    fetch("http://localhost:3005/videos")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getAllVideos();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideos setVideos={setVideos} />
      <button onClick={toggleShow}>Show Videos</button>
      {toggleArea &&
        videos.length > 0 &&
        videos.map((video) => (
          <VideoInfo
            key={video.id}
            video={video}
            videos={videos}
            setVideos={setVideos}
          />
        ))}
    </div>
  );
}

export default App;
