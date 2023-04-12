import "./App.css";
import TheVideos from "./components/TheVideos.js";
import About from './components/About.js';
import Features from "./components/Features.js";
import Pricing from "./components/Pricing.js";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import Romantic from "./components/Romantic";
import Documentary from "./components/Documentary";

import React from "react";
function App({ lik }) {
  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/" element={<TheVideos />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/romantic" element={<Romantic />} />
          <Route path="/documentary" element={<Documentary />} />
        </Routes>
      </>
      {/* <TheVideos/>  */}
    </div>
  );
}

export default App;
