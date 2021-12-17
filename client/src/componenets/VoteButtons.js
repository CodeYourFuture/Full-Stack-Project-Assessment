import React, { useState } from "react";
import { FaRegThumbsUp, FaThumbsDown } from "react-icons/fa";

const VoteButtons = ({ rating }) => {
  const [vote, setVote] = useState(rating);
  const upVote = (e) => {
    e.preventDefault();
    setVote(vote + 1);
  };

  const downVote = (e) => {
    e.preventDefault();
    setVote(vote - 1);
  };
  return (
    <div className="voteButtons" style={{ marginLeft: "50px" }}>
      <button
        onClick={upVote}
        style={{ margin: "20px" }}
        type="button"
        className="btn btn-info"
      >
        <FaRegThumbsUp />
      </button>
      <p style={{ margin: "20px" }}>{vote}</p>
      <button
        onClick={downVote}
        style={{ margin: "20px" }}
        type="button"
        className="btn btn-danger"
      >
        <FaThumbsDown />
      </button>
    </div>
  );
};

export default VoteButtons;
