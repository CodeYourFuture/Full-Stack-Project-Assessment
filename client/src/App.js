import React from "react";

import "./App.css";
import VideoList from "./VideoList";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
       <VideoList />
      </header>
    </div>
  );
}

export default App;
