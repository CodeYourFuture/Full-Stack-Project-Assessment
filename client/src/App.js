import React, { useState, useEffect, useCallback } from "react";
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

  const getAllVideos = useCallback(() => {
    // fetch(`https://video-server-1vzq.onrender.com/videos?order=${order}`)
    fetch(`https://video-server-1vzq.onrender.com/videos`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setVideos(data);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleOrderChange() {
    order === "ASC" ? setOrder("DESC") : setOrder("ASC");
  }

  useEffect(() => {
    getAllVideos();
  }, [getAllVideos]);

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
                  order={order}
                  getAllVideos={getAllVideos}
                />
              }
            />
          </Routes>
        </BrowserRouter>
        {/* <button onClick={toggleShow} className="click-btn btn">
          Click to view videos
        </button>
        {toggleArea && (
          <ShowVideos
            toggleShow={toggleShow}
            toggleArea={toggleArea}
            handleOrderChange={handleOrderChange}
            videos={videos}
            setVideos={setVideos}
            order={order}
            getAllVideos={getAllVideos}
          />
        )} */}
      </section>
    </div>
  );
}

export default App;
