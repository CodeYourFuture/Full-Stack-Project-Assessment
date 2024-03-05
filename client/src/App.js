import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./App.css";
import Videos from "./Videos.js";

function App() {
  const [showVideos, setShowVideos] = useState(false);
  const [loadVideo, setLoadVideo] = useState([]);
  const [order, setOrder] = useState("ase");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "http://ec2-13-49-244-227.eu-north-1.compute.amazonaws.com:3000/videos"
        );
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const data = await response.json();
        //desending acording to the rating
        data.sort((a, b) => b.rating - a.rating);
        return setLoadVideo(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  function orderClickHandler(e, newOrder) {
    e.preventDefault();

    if (newOrder === "asc") {
      const sortedVideos = [...loadVideo].sort((a, b) => a.rating - b.rating);
      setLoadVideo(sortedVideos);
      setOrder("asc");
    } else {
      const sortedVideos = [...loadVideo].sort((a, b) => b.rating - a.rating);
      setLoadVideo(sortedVideos);
      setOrder("desc");
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
            <button
              onClick={(e) => orderClickHandler(e, "asc")}
              disabled={order === "asc"}
            >
              Ase
            </button>

            <button
              onClick={(e) => orderClickHandler(e, "desc")}
              disabled={order === "desc"}
            >
              Desc
            </button>
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
                loadVideo={loadVideo}
                setLoadVideo={setLoadVideo}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
