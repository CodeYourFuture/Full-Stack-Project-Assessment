import { useState, useEffect } from "react";
import "./App.css";
import AddVideo from "./components/AddVideo";
import VideosContainer from "./components/VideosContainer";
import videosData from "./data/exampleresponse.json";

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function getVideos() {
      setVideos([...videosData]);
    }

    getVideos();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo />
      <VideosContainer videos={videos} />
    </div>
  );
}

export default App;
