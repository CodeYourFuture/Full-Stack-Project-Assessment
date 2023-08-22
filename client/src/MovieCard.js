import React from "react";
import "./MovieCard.css";
function MovieCard(props) {
  const fetchAddress = "https://full-stack-server-fofh.onrender.com/";
  const movieName = props.movie.url.split("watch?v=")[1];
  const movieSrc = "https://www.youtube.com/embed/" + movieName;

  function deleteMovieCard() {
    fetch(fetchAddress + props.movie.id, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        props.setRefreshVideos(true);
      });
  }

  function upVote() {
    let newVote = props.movie.rating + 1;
    fetch(fetchAddress + props.movie.id, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rating: newVote,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        props.setRefreshVideos(true);
      });
  }

  function downVote() {
    let newVote = props.movie.rating - 1;
    fetch(fetchAddress + props.movie.id, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rating: newVote,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        props.setRefreshVideos(true);
      });
  }

  return (
    <div className="movie-card">
      <p>{props.movie.title}</p>
      <iframe width="340" src={movieSrc} title={props.movie.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <i className="fa-solid fa-thumbs-up" onClick={upVote}></i>
      <span> Votes: {props.movie.rating} </span>
      <i className="fa-solid fa-thumbs-down" onClick={downVote}></i>
      <br></br>
      <button className="remove-button" onClick={deleteMovieCard}>
        Remove Video
      </button>
    </div>
  );
}

export default MovieCard;
