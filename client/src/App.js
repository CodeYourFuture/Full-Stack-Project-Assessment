import "./App.css";
import React, { useState , useEvent , useEffect } from "react";
import DisplayVideos from "./DisplayVideos";
import AddVideo from "./AddVideo";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>

        
      </header>
      <body>
        <DisplayVideos/>
      </body>
    </div>
  );
}

export default App;
