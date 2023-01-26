import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import InsertVideo from "./InsertVideo";
// import video from "./singleVideo.json";
import defaultVideos from "./exampleresponse.json";

function App() {
  return (
    <div className="App">
      <header className="my-App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
        <div className="upper-div">
          <button className="add-video-btn">Add Video</button>
          <label>Search</label>
          <input></input>
        </div>
        <div className="all-videos">
          {defaultVideos.map((video, key) => (
            <InsertVideo video={video} key={key}/>
            
          ))}

        </div>
      </body>
    </div>
  );
}

export default App;
