import React, { useState } from "react";
import "./App.css";
import AddVideo from "./AddVideo";

function App() {
  const [videos, setVideos] = useState([]);
  const urlToFetch = "http://localhost:5000/";

  const getVideos = (id="") => {
    fetch(`${urlToFetch}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // setStatus("failed");
        } else {
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
        <AddVideo urlToFetch={urlToFetch} setVideos={setVideos} videos={videos} getVideos={getVideos} />
      </main>
    </div>
  );
}

export default App;
