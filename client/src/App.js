import "./styling/App.css";
import "./styling/hoverbuttons.css"
import "./styling/tornEffect.css"
import React, { useState , useEvent , useEffect } from "react";
import DisplayVideos from "./DisplayVideos";
import AddVideo from "./AddVideo";


function App() {
  return (
    <div className="App">
      <header>
      </header>
      <body>
        <DisplayVideos/>
      </body>
      <footer>
        <h3>Website front-end and back-end designed by Erin Dyson </h3>
      </footer>
    </div>
  );
}

export default App;
