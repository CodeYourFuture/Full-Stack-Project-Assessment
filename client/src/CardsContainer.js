import React from "react";
import "./CardsContainer.css";
import MovieCard from "./MovieCard";

function CardsContainer({ allMovies, setAllMovies, setRefreshVideos }) {
  return (
    <div className="cards-container">
      {allMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} setRefreshVideos={setRefreshVideos} />
      ))}
    </div>
  );
}

export default CardsContainer;
