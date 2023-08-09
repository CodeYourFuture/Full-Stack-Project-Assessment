import React, { useState } from "react";
import "./BodyContainer.css";

import CardsContainer from "./CardsContainer";
import NewVideoContainer from "./NewVideoContainer";
import movies from "./exampleresponse.json";

function BodyContainer() {
  const [allMovies, setAllMovies] = useState(movies);
  return (
    <div className="body-container">
      <NewVideoContainer allMovies={allMovies} setAllMovies={setAllMovies} />
      <CardsContainer allMovies={allMovies} setAllMovies={setAllMovies} />
    </div>
  );
}

export default BodyContainer;
