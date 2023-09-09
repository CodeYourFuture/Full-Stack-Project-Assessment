import "./App.css";
import React, { useState, useEffect } from "react";
import AddVideo from "./AddVideo";
import VideoCards from "./VideoCards";
import Search from "./Search.js";

const backendUrl = process.env.REACT_APP_BACKEND_URL; // we are telling front end where to access back end (see .env in client folder)
console.log(`REACT_APP_BACKEND_URL = ${backendUrl}`);
if (!backendUrl) {
  throw new Error("REACT_APP_BACKEND_URL not defined");
}

function App() {
  const [count, setCount] = useState(0); // creating counter to tell react to rebuild component every time there was a change in the db
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      console.log("front end fetch function");
      const response = await fetch(`${backendUrl}/videos`);
      const data = await response.json();
      console.log({ data });
      setVideos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [count]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>

      <AddVideo videos={videos} setVideos={setVideos} setCount={setCount} />
      <VideoCards videos={videos} setVideos={setVideos} />
      <Search />
    </div>
  );
}

export default App;
