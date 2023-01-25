import "./App.css";
import Heading from "./Heading";
import VideoData from "./exampleresponse.json"
import VideosList from "./VideosList";
import Form from "./Form";
import { useState } from "react";

fetch("http://localhost:5001/",{
  mode:'cors'})
  .then((response) => console.log(response.json));

function App() {
  const [videos, setVideos] = useState(VideoData)

  return (
    <div className="App">
      <Heading />
      <Form setVideos={setVideos}/>
      <VideosList videoData={videos}/>
    </div>
  );
}

export default App;
