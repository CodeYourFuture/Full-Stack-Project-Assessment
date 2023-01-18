import React from "react";
import "./App.css";
import dataVideos from "./exampleresponse.json";
import VideoCard from "./VideoCard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {dataVideos.map((video, key) => (
              <div className="col">
                <VideoCard video={video} key={key} />
              </div>
            ))}
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
