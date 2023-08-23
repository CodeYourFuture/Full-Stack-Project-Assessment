import "./App.css";
import React from "react";
import VideoCards from "./VideoCards";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <VideoCards />
      </header>
    </div>
  );
}

export default App;
