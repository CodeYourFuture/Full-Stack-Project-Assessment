import React, { useState } from "react";
import SingleVideo from "./SingleVideo";
import example from "./exampleresponse.json";
import "./App.css";

function App() {
  const [videos, setVideos] = useState(example);
  console.log(videos)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <main>
        {videos.map((video, index) => (
          <SingleVideo video={video} key={index} index={index} videos={videos} setVideos={setVideos} />
        ))}
      </main>
    </div>
  );
}

export default App;
