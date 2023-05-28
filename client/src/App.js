import React from "react";
import Navbar from "./comps/Navbar";
import VideosList from "./comps/VideosList";
import AddVideo from "./comps/AddVideo";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <AddVideo />
        <VideosList />
      </header>
    </div>
  );
}

export default App;
