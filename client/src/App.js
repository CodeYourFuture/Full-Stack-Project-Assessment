import React, { useState } from "react";
import example from "./exampleresponse.json";
import "./App.css";
import AddVideo from "./AddVideo";

function App() {
  const [videos, setVideos] = useState(example);
  
  console.log(videos);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="page-title">Video Recommendation</h1>
      </header>
      <main>
        
    <AddVideo setVideos={setVideos} videos={videos} />
        
      </main>
    </div>
  );
}

export default App;
