import React from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";
import NewVideo from "./NewVideo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <NewVideo />
      </header>
      <body>
        {dataVideos.map((video, key) => (
          <Video video={video} key={key}/>
        ))}
      </body>
    </div>
  );
}

export default App;
