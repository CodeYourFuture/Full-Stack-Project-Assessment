import React from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";
import AddVideoButton from "./AddVideoButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideoButton />

      <div className="body">
        {dataVideos.map((video, key) => (
          <Video video={video} key={key} />
        ))}
      </div>
    </div>
  );
}

export default App;
