import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import LandingPage from "./LandingPage";
import AddVideos from "./AddVideos";
import ShowVideos from "./ShowVideos";

function App() {
  const [videos, setVideos] = useState([]);

  const [toggleArea, setToggleArea] = useState(false);

  const [order, setOrder] = useState("ASC");

  const toggleShow = () => setToggleArea((s) => !s);

  function getAllVideos() {
    fetch(`https://video-server-1vzq.onrender.com/videos?order=${order}`)
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => console.log(error));
  }

  function handleOrderChange() {
    order === "ASC" ? setOrder("DESC") : setOrder("ASC");
  }

  useEffect(() => {
    getAllVideos();
  }, [order]);

  return (
    <div className="App">
      <Header handleOrderChange={handleOrderChange} />
      <section className="page-body">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/add"
              element={<AddVideos getAllVideos={getAllVideos} />}
            />
            <Route
              path="/videos"
              element={
                <ShowVideos
                  toggleShow={toggleShow}
                  toggleArea={toggleArea}
                  handleOrderChange={handleOrderChange}
                  videos={videos}
                  setVideos={setVideos}
                  getAllVideos={getAllVideos}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </section>
    </div>
  );
}

export default App;
