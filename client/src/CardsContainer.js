import React, { useState, useEffect } from "react";
import "./CardsContainer.css";
import MovieCard from "./MovieCard";

function CardsContainer({ allMovies, setAllMovies }) {
  const [deleteId, setDeleteId] = useState(0);
  const [upVoteId, setUpVoteId] = useState(0);
  const [downVoteId, setDownVoteId] = useState(0);

  useEffect(() => {
    if (deleteId !== 0) {
      console.log("Deleting" + deleteId);

      setAllMovies((oldValues) => {
        return oldValues.filter((item) => item.id !== deleteId);
      });
    }
  }, [deleteId]);

  useEffect(() => {
    if (upVoteId !== 0) {
      setAllMovies((oldValues) => {
        return oldValues.map((item) => {
          if (item.id === upVoteId) {
            item.rating++;
          }
          return item;
        });
      });

      setUpVoteId(0);
    }
  }, [upVoteId]);

  useEffect(() => {
    if (downVoteId !== 0) {
      setAllMovies((oldValues) => {
        return oldValues.map((item) => {
          if (item.id === downVoteId) {
            item.rating--;
          }
          return item;
        });
      });

      setDownVoteId(0);
    }
  }, [downVoteId]);

  return (
    <div className="cards-container">
      {allMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} setDeleteId={setDeleteId} setUpVoteId={setUpVoteId} setDownVoteId={setDownVoteId} />
      ))}
    </div>
  );
}

export default CardsContainer;
