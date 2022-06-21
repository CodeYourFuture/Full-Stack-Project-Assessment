import React, { useContext } from "react";
import { IoThumbsUp, IoThumbsDown } from "react-icons/io5";
import "../../styles/vote.css";
import UserContext from "../../context/UserContext";

const Vote = () => {
  const { vote, setVote } = useContext(UserContext);
  return (
    <div className="vote_container">
      <button
        name="upVote"
        className="up_vote_btn"
        onClick={() => setVote(vote - 1)}
      >
        <IoThumbsDown />
      </button>
      <span className="vote_title">Votes</span>
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
