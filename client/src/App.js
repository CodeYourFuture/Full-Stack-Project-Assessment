import React from "react";
import "./App.css";
import movieData from "./movieData.json";
// import VideoInfo from "./VideoInfo";

function App() {
  return (
    <div className="App">
      <header className="App-header bg-dark">
        <h1>Video Recommendation</h1>
      </header>
      <VideoInfo />
    </div>
  );
}

function VideoInfo() {
  return (
    <ul>
      {movieData.map((movie) => (
        <li>{movie.title}</li>
      ))}
    </ul>
  );
}

export default App;
