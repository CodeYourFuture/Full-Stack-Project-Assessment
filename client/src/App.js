import React from "react";
import Navbar from "./comps/Navbar";
import VideosList from "./comps/VideosList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <VideosList />
      </header>
    </div>
  );
}

export default App;
