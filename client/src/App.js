import "./App.css";
import React, { useState, useEffect } from "react";
import VideoCards from "./VideoCards";
import AddVideo from "./AddVideo";
// import data from "./exampleresponse.json";

function App() {
  let [videos, setVideos] = useState([]);

  useEffect(function () {
    fetch("http://52.56.239.192:5004")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      });
  }, []);

  function addVideo(video) {
    setVideos([...videos, video]);
  }

  function removeVideo(id) {
    setVideos(videos.filter((video) => video.id !== id));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo addVideo={addVideo} />
      <VideoCards videoList={videos} removeVideo={removeVideo} />
    </div>
  );
}

export default App;
//test