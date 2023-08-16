// Level 250 - https://www.codingthesmartway.com/how-to-fetch-api-data-with-react/

import "./App.css";
import React, { useState, useEffect } from "react";
import AddVideo from "./AddVideo";
import VideoCards from "./VideoCards";
import Search from "./Search.js";

function App() {
  const [videos, setVideos] = useState([]);

  const fetchVideos = () => {
    console.log("some text, some more text");
    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>

      <AddVideo videos={videos} setVideos={setVideos} />
      <VideoCards videos={videos} setVideos={setVideos} />
      <Search />
    </div>
  );
}

export default App;
