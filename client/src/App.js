import React, { useState } from "react";
import "./App.css";
import AddVideo from "./AddVideo";
import { ArrowCircleUp, ArrowCircleDown } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function App() {
  const [videos, setVideos] = useState([]);
  const [videoOrder, setVideoOrder] = useState("DESC")
  const urlToFetch = "https://full-stack-matilda-ako.herokuapp.com/";
  


  const getVideos = (videoOrder) => {
    fetch(`${urlToFetch}?order=${videoOrder}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // setStatus("failed");
        } else {
          console.log(data);
          setVideos(data);
          // setStatus("success");
        }
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="page-title">Video Recommendation</h1>
      </header>
      <main>
        
        <AddVideo urlToFetch={urlToFetch} setVideos={setVideos} videos={videos} getVideos={getVideos} videoOrder={videoOrder} setVideoOrder={setVideoOrder} />
      </main>
    </div>
  );
}

export default App;
