import "./App.css";
import TheVideos from"./components/TheVideos.js";
import EmbedVideos from "./components/EmbedVideos.js";
//import NewVideos from "./components/NewVideos";      
import React from "react";
import Asending from "./components/Asending";
import IframeVideo from "./components/IframeVideo";
function App({ lik }) {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <hr/>
      <Asending />
      <TheVideos/> 
      <IframeVideo/>
     <EmbedVideos /> 
    </div>
  );
}

export default App;
