import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Import Routes instead of Switch

import "./App.css";
import Videos from "./Videos.js";

function App() {
  const [showVideos, setShowVideos] = useState(false);
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Video Recommendation</h1>
        </header>
        <nav className="nav">
          <Link to="/videos" onClick={() => setShowVideos(true)}>
            Videos
          </Link>
        </nav>
        <Routes>
          {" "}
          
          <Route path="/videos" element={<Videos show={showVideos} setShow={setShowVideos} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
