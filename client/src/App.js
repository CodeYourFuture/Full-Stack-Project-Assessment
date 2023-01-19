import React, { useState } from "react";
import "./App.css";
import dataVideos from "./exampleresponse.json";
import VideoCard from "./VideoCard";

function App() {
  const [videos, setVideos] = useState(dataVideos);

  function handleDelete(id){ 
    let filterVideos = videos.filter(video => video.id !== id);
     setVideos(filterVideos);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {videos.map((video, key) => (
              <div className="col">
                <VideoCard
                  video={video}
                  key={key}
                  handleDelete={() => handleDelete(video.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
