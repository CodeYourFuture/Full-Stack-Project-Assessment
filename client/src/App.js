import React, { useState } from "react";
import "./App.css";
import YoutubeVids from "./components/YoutubeVids";
import AddVids from "./components/AddVids";


const App = () => {
  
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <vidSearch />
     
    <YoutubeVids  />
    </div>
    )};

  
  


export default App;
