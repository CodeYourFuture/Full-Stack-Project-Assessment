import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";

function VideoCard({ rating, title, url }) {
  const [vote, setvote] = useState(rating);

  const handleVoteUp = (e) => {
    let value = e.target.value;
    e.preventDefault();
    console.log(value);
    setvote(rating + 1); // this is to add only one vote per user, another word i don't want user to keep adding more votes.
  };

  const handleVoteDown = (e) => {
    e.preventDefault();
    setvote(rating - 1); // this is to add only one vote per user, another word i don't want user to keep adding more votes.
  };

  return (
    <Container className="card">
      <div>
        <button onClick={handleVoteUp}>Vote Up</button>
        <span>{vote}</span>
        <button onClick={handleVoteDown}>Vote Down</button>
      </div>
      <h3>{title}</h3>

      <iframe title="video" src={url} width="853" height="480"></iframe>
    </Container>
  );
}

export default VideoCard;

