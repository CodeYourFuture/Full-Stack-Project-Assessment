import "./App.css";
import React from "react";
import exampleresponse from "./Data/exampleresponse.json";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <h3>{console.log(exampleresponse)}</h3>
      <h3>{console.log(exampleresponse[0].title)}</h3>
    </div>
  );
}

export default App;
