import React from "react";
import { IoThumbsUp, IoThumbsDown } from "react-icons/io5";
import "../../styles/vote.css";

const Vote = ({ vote, setVote }) => {
  return (
    <div>
      <button
        name="upVote"
        className="up_vote_btn"
        onClick={() => setVote(vote - 1)}
      >
        <IoThumbsDown />
      </button>
      <span>Votes: {vote}</span>
      <button
        name="down_vote_btn"
        className="down_vote_btn"
        onClick={() => setVote(vote + 1)}
      >
        <IoThumbsUp />
      </button>
    </div>
  );
};

export default Vote;
