import React, { useState, useEffect } from "react";
import "./BodyContainer.css";

import CardsContainer from "./CardsContainer";
import NewVideoContainer from "./NewVideoContainer";

function BodyContainer() {
  const [allMovies, setAllMovies] = useState([]);
  const [refreshVideos, setRefreshVideos] = useState(true);

  useEffect(() => {
    if (refreshVideos) {
      fetch("http://localhost:5000/")
        .then((res) => {
          console.log("the result ", res);
          return res.json();
        })
        .then((data) => {
          console.log("the data", data);
          setAllMovies(data);
        });
    }
    setRefreshVideos(false);
  }, [refreshVideos]);

  return (
    <div className="body-container">
      <NewVideoContainer allMovies={allMovies} setRefreshVideos={setRefreshVideos} />
      <CardsContainer allMovies={allMovies} setAllMovies={setAllMovies} setRefreshVideos={setRefreshVideos} />
    </div>
  );
}

export default BodyContainer;
