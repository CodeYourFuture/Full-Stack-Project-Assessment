import React, { useState } from "react";

const Vote = ({ videoRating }) => {
  const [vote, setVote] = useState(videoRating);
  const videoLike = () => {
    setVote(vote + 1);
  };
  const videoDislike = () => {
    setVote(vote - 1);
  };
  return (
    <div className="voteContainer">
      <i className="fa fa-thumbs-up" onClick={() => videoLike()}></i>
      <p>{vote} VOTES</p>
      <i className="fa fa-thumbs-down" onClick={() => videoDislike()}></i>
    </div>
  );
};
export default Vote;
