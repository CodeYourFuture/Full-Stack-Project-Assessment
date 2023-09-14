import React, {useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; 

import "./App.css";
import Videos from "./Videos.js";

function App() {
  
  const [showVideos, setShowVideos] = useState(false);
  return (
    <Router>
      <div className="App">
        <header className="appHeader">
          <h1 style={{background:"#97CAEF"}}>Video Recommendation</h1>
        </header>
        <nav className="nav">
          
          <Link to="/videos" style={{color:"black" ,marginLeft:20}} onClick={() => setShowVideos(true)}>
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
