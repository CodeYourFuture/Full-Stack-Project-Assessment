import React, { useState } from "react";
import "./App.css";
import AddVideo from "./AddVideo";

function App() {
  const [videos, setVideos] = useState([]);
  const urlToFetch = "http://localhost:5000/";

  const getVideos = (order = "desc") => {
    fetch(`${urlToFetch}/?order=${order}`)
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
        <button onClick={() => getVideos("asc")}>Low to High</button>
        <button onClick={getVideos()}>High to Low</button>
        <AddVideo urlToFetch={urlToFetch} setVideos={setVideos} videos={videos} getVideos={getVideos} />
      </main>
    </div>
  );
}

export default App;
