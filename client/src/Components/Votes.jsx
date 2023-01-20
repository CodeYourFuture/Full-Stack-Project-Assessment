import React from "react";
import { useState } from "react";
import { FaRegThumbsUp, FaThumbsDown } from "react-icons/fa";

function Votes() {
  const [vote, setVote] = useState(0);

  function handleThumbsUp() {
    setVote((vote) => vote + 1);
  }

  function handleThumbsDown() {
    setVote((vote) => vote === 0? vote: vote - 1)
  }

  return (
    <div>
      <button onClick={handleThumbsUp}>
        <FaRegThumbsUp />
      </button>
      <p>{`${vote} votes`} votes</p>
      <button onClick={handleThumbsDown}>
        <FaThumbsDown />
      </button>
    </div>
  );
}
export default Votes;
