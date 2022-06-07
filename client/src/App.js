import "./App.css";
import React, { useState } from "react";
import exampleresponse from "./exampleresponse.json";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const [displayVideo, setDisplayVideo] = useState();

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1>Video Recommendation by Mandeep</h1>
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
      <div>
        <ul className="card-container">
          {exampleresponse.map((card) => (
            <li className="card">
              <h2>{card.title}</h2>
              <p>THE VIDEO</p>
              <p>Votes</p>
              <div className="button-container">
                <button>Up Vote</button>
                <button>Down Vote</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
