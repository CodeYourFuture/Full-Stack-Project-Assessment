import React from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";
import Insert from "./insert";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <main>
        <div className="insert">
          <Insert />
        </div><br></br>
        <div>
          {dataVideos.map((video, key) => (
            <Video video={video} key={key} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
