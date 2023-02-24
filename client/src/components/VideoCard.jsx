import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import * as Fa from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function VideoCard({ handleDeleteVideo, id, rating, title, url }) {
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

  const getId = (e) => {
    handleDeleteVideo(id);
  };

  return (
    <Container className="card">
      <div className="rating-Class">
        <Fa.FaThumbsUp onClick={handleVoteUp} />
        <span>{like}</span>
        <Fa.FaThumbsDown onClick={handleVoteDown} />
      </div>
      <h3>{title}</h3>

      <iframe title="video" src={url} width="853" height="480"></iframe>
      <MdDelete onClick={getId} />
    </Container>
  );
}

export default VideoCard;
