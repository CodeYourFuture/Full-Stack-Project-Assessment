import { useState } from "react";
import React from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";

function App() {
  let [data, setVideo] = useState(dataVideos)

  function deleteBtn(id) {
    console.log(id)
    setVideo((data) => data.filter((video) => video.id !== id));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div>
        {data.map((video, key) => (
          <Video video={video} key={key} deletes={deleteBtn} />
        ))}
      </div>
    </div>
  );
}

export default App;
