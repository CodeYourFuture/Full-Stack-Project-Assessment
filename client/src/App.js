import "./App.css";
import React, { useState } from "react";
import exampleresponse from "./exampleresponse.json";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1>Video Recommendation Mandeep</h1>
        </header>
      </div>
      <div>Add video</div>
      <div>
        <input
          className="searchbar"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />{" "}
        Search
      </div>
      <div>{exampleresponse.map(x => x.title)}</div>
    </div>
  );
}

export default App;
