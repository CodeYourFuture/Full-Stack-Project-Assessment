import "./App.css";
import Heading from "./Heading";
import VideosList from "./VideosList";
import Form from "./Form";
import { useState, useEffect } from "react";

function App() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch("/videos")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="App">
      <Heading />
      <Form setVideos={setVideos} />
      <VideosList videoData={videos} />
    </div>
  );
}

export default App;
