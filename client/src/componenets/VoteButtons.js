import React, { useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";

const VoteButtons = () => {
  const [vote, setVote] = useState(0);

  const upVote = () => {
    setVote(vote + 1);
  };

  const downVote = () => {
    setVote(vote - 1);
  };
  return (
    <div className="voteButtons" style={{ marginLeft: "50px" }}>
      <button
        onClick={upVote}
        style={{ margin: "50px" }}
        type="button"
        className="btn btn-info"
      >
        <FaRegThumbsUp />
      </button>
      <p style={{ margin: "50px" }}>{vote}</p>
      <button
        onClick={downVote}
        style={{ margin: "50px" }}
        type="button"
        className="btn btn-danger"
      >
        <FaThumbsDown />
      </button>
    </div>
  );
};

export default VoteButtons;
