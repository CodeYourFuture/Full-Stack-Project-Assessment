import React from 'react';
import "./App.css";
import AllVideoFiles from "./components/allVideoContents.js";


function App() {
  return (
    <div>
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AllVideoFiles />
    </div>
  );
}

export default App;
