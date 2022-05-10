import "./App.css";
import TheVideos from"./components/TheVideos.js";
import EmbedVideos from "./components/EmbedVideos.js";
//import NewVideos from "./components/NewVideos";      
import React from "react";
import Asending from "./components/Asending";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <hr/>
      <Asending />
      <TheVideos/>
      
     <EmbedVideos/> 
    </div>
  );
}

export default App;
