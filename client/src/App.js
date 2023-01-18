import "./App.css";
import VideoCard from "./component/VideoCard";
import AddVideo from "./component/AddVideo";
import React from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <h3>Do You Have Any Video Recommendation For Us!?</h3>
          <AddVideo />
        </nav>
        <VideoCard />
      </header>
    </div>
  );
}

export default App;
