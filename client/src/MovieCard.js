import React from "react";
import "./MovieCard.css";
function MovieCard(props) {
  const movieName = props.movie.url.split("watch?v=")[1];
  const movieSrc = "https://www.youtube.com/embed/" + movieName;

  function deleteMovieCard() {
    props.setDeleteId(props.movie.id);
  }

  function upVote() {
    props.setUpVoteId(props.movie.id);
  }
  function downVote() {
    props.setDownVoteId(props.movie.id);
  }

  return (
    <div className="movie-card">
      <p>{props.movie.title}</p>
      <iframe width="340" src={movieSrc} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <i className="fa-solid fa-thumbs-up" onClick={upVote}></i>
      <span> Votes: {props.movie.rating} </span>
      <i className="fa-solid fa-thumbs-down" onClick={downVote}></i>
      <br></br>
      <button onClick={deleteMovieCard}>Remove</button>
    </div>
  );
}

export default MovieCard;
