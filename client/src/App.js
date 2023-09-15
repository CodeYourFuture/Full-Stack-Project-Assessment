import React, {useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; 

import "./App.css";
import Videos from "./Videos.js";

function App() {
  
  const [showVideos, setShowVideos] = useState(false);
   const [loadData, setLoadData] = useState([]);

  async function aseClickHandler(e) {
     e.preventDefault();
      try {
        const response = await fetch(
          "https://web-server-5nme.onrender.com/videos"
        );
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const data = await response.json();
        //asending acording to the rating
        data.sort((a, b) => a.rating - b.rating);
        return setLoadData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  }

async function descClickHandler(e) {
  e.preventDefault();
  try {
    const response = await fetch("https://web-server-5nme.onrender.com/videos");
    if (!response.ok) {
      throw new Error("something went wrong");
    }
    const data = await response.json();
    //asending acording to the rating
    data.sort((a, b) => b.rating - a.rating);
    return setLoadData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

  return (
    <Router>
      <div className="App">
        <header className="appHeader">
          <h1 style={{ background: "#97CAEF", color: "black" }}>
            Video Recommendation
          </h1>
        </header>
        <nav className="nav">
          <div className="orderBtn">
            <p>order by rate : </p>
            <button onClick={aseClickHandler}>ase</button>
            <button onClick={descClickHandler}>desc</button>
          </div>
          <div style={{ backgroundColor: "#55BCC9" }}></div>
          <Link
            to="/videos"
            style={{
              color: "#FC4445",
              marginLeft: 20,
              textDecoration: "none",
              fontWeight: "bold",
            }}
            onClick={() => setShowVideos(true)}
          >
            Videos
          </Link>
        </nav>
        <Routes>
          {" "}
          <Route
            path="/videos"
            element={
              <Videos
                show={showVideos}
                setShow={setShowVideos}
                loadData={loadData}
                setLoadData={setLoadData}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
