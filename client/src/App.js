import React, { useState } from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";
import AddVideoButton from "./AddVideoButton";

function App() {
  const [videoData, setVideoData] = useState(dataVideos);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideoButton />

      <div className="body">
        {videoData.map(({ id, title, url, rating }) => (
          <Video
            videoData={videoData}
            setVideoData={setVideoData}
            title={title}
            url={url}
            id={id}
            rating={rating}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
