import React, { useState } from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";

function App() {
  const [videoData, setVideoData] = useState(dataVideos);

  const deleteVideo = (id) => {
    setVideoData((videoData) => videoData.filter((el) => el.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
        {videoData.map((video) => (
          <Video
            video={video}
            key={video.id}
            vidId={video.id}
            deleteVideo={deleteVideo}
          />
        ))}
      </body>
    </div>
  );
}

export default App;
