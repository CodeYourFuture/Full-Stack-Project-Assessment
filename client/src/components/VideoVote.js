import React, { useState } from "react";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

const AddVideo = ({ videoData }) => {
  const [vote, setVote] = useState(0);

  return (
    <div>
      <button
        name="increaseVote"
        aria-label="Like video"
        className="btn btn-outline-danger m-2"
        onClick={() => setVote(vote - 1)}
      >
        <FaRegThumbsDown />
      </button>
      <label>{vote} Votes </label>
      <button
        name="decreaseVote"
        aria-label="Dislike video"
        className="btn btn-outline-success m-2"
        onClick={() => setVote(vote + 1)}
      >
        <FaRegThumbsUp />
      </button>
    </div>
  );
};

export default AddVideo;
