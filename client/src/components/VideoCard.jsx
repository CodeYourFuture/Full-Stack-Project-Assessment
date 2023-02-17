import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";

function VideoCard({ rating, title, url }) {
  const [like, setLike] = useState(rating);

  // adds one vote
  const handleVoteUp = (e) => {
    e.preventDefault();
    setLike(rating + 1);
  };

  // setting back to the original rating number, and can substract one
  const handleVoteDown = (e) => {
    e.preventDefault();
    like > rating ? setLike(rating) : setLike(rating - 1);
  };

  return (
    <Container className="card">
      <div>
        <button onClick={handleVoteUp}>Vote Up</button>
        <span>{like}</span>
        <button onClick={handleVoteDown}>Vote Down</button>
      </div>
      <h3>{title}</h3>

      <iframe title="video" src={url} width="853" height="480"></iframe>
    </Container>
  );
}

export default VideoCard;
