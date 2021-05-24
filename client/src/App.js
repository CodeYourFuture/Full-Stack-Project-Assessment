import React, { useState } from "react";
import "./App.css";
import YoutubeVids from "./components/YoutubeVids";
import vidSearch from "./components/vidSearch";
import vidsData from "./vidsData.json";
import AddVids from "./components/AddVids";


const App = () => {
  
  const [vids, setVids] = useState(vidsData);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <vidSearch />
      <AddVids />
      {vids.map((vid) => (
    <YoutubeVids  />
      ))}
    </div>
  
  );
};

export default App;
