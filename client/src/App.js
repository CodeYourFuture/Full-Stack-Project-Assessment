import React, { useState, useEffect } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import VideoAdd from "./components/VideoAdd";
import fetchVideos from "./utils/fetchVideos";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
function App() {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredVideos = videos.filter((video) =>
    video.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    fetchVideos("", setVideos);
  }, []);

  return (
    <Router>
      <div className="App">
        <section className="buttonContainer">
          <button>
            <Link to="/">Home</Link>
          </button>
          <button>
            <Link to="/addvideo">Add New Video</Link>
          </button>
          <button>
            <Link to="/videos">Show Videos</Link>
          </button>
        </section>

        <Routes>
          <Route
            path="/"
            element={
              <div className="welcome">
                <h2>HOME PAGE !!!</h2>
              </div>
            }
          ></Route>
          <Route
            path="/addvideo"
            element={<VideoAdd setVideos={setVideos} />}
          ></Route>
          <Route
            path="/videos"
            element={
              <>
                <input
                  id="searchVideos"
                  type="text"
                  placeholder="Search video..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                />

                <VideoCard
                  videos={filteredVideos}
                  setVideos={setVideos}
                />
              </>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
