import React, { useState } from "react";
import "./App.css";
import Video from "./Video";
import data from "./exampleresponse.json";

function App() {
  const [videos, setVideos] = useState(data);
  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <Video setVideos={setVideos} videos={videos} />
      </header>
    </div>
  );
}

export default App;
