// import React, { useState } from "react";
import "./App.css";
import InsertVideos from "./InsertVideos";
// import Data from "./exampleresponse.json";


function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Video Recommendation</h1>
      </header>
      <body>
        <div>
          <div>
            <InsertVideos/>
          </div>
          
        </div>
      </body>
    </div>
  );
}

export default App;
