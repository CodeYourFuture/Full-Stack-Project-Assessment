import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { IoThumbsUp, IoThumbsDown } from "react";

const Vote = () => {
  const { vote, setVote } = useContext(UserContext);
  return (
    <div>
      <button
        name="upVote"
        className="up_vote_btn"
        onClick={() => setVote(vote - 1)}
      >
        <IoThumbsDown />
      </button>
      <label>{vote} Votes </label>
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
