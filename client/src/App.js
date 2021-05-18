import React from "react";
import "./App.css";
import movieData from "./movieData.json";
// import Iframe from "react-iframe";
// import VideoInfo from "./VideoInfo";

function App() {
  return (
    <div className="App">
      <header className="App-header bg-dark">
        <h1>Video Recommendation</h1>
      </header>
      <main>
        <VideoInfo />
      </main>
    </div>
  );
}

function VideoInfo() {
  return (
    <ul className="videoContainer">
      {movieData.map((movie, key) => (
        <li className="videoInfo" key={movie.id}>
          <h3>{movie.title}</h3>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </li>
      ))}
    </ul>
  );
}

export default App;
