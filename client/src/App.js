import React, { useState } from "react";
import "./App.css";
import AddVideo from "./AddVideo";

function App() {
  const [videos, setVideos] = useState([]);
  const [videoOrder, setVideoOrder] = useState("DESC")
  const urlToFetch = "http://localhost:5000/";

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
        <button
          onClick={() => {
            setVideoOrder("ASC");
            getVideos("ASC");
          }}
        >
          Low to High
        </button>
        <button
          onClick={() => {
            setVideoOrder("DESC");
            getVideos("DESC");
          }}
        >
          High to Low
        </button>
        <AddVideo urlToFetch={urlToFetch} setVideos={setVideos} videos={videos} getVideos={getVideos} videoOrder={videoOrder} />
      </main>
    </div>
  );
}

export default App;
