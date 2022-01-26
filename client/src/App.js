import React from "react";
import "./App.css";
import Video from "../src/Video";
import AddVideo from "../src/AddVideo";
import ExampleResponse from "./data/exampleresponse.json";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <main>
        <AddVideo />
        <Video videoData={ExampleResponse} />
      </main>
    </div>
  );
}

export default App;
