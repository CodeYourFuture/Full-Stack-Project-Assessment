import React, { useState, useEffect } from "react";
import "./App.css";
import Video from "./Components/Video";
import AddVideoBtn from "./Buttons/AddVideoBtn";
import VideoCard from "./Components/VideoCard";

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/videos")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.log(error));
  }, []);

  function addNewVideo(newVideo) {
    fetch("/videos", {
      method: "POST",
      body: JSON.stringify(newVideo),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    const allVideo = videos.concat(newVideo);
    setVideos(allVideo);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideoBtn addNewVideoFunction={addNewVideo} />
      <div className="container-fluid">
        {videos.map((video, key) => (
          <Video video={video} key={key} data = {setVideos} />
        ))}
      </div>
      <VideoCard />
    </div>
  );
}
export default App;
