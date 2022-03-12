import React, { useState } from "react";
import {
  BsFillHandThumbsDownFill,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";

function VideoLikes() {
  const [votes, setVotes] = useState(0);

  function increaseVotes() {
    setVotes(votes + 1);
  }
  function decreaseVotes() {
    setVotes(votes - 1);
  }

  return (
    <div className="vote-icons">
      <BsFillHandThumbsUpFill
        className="text-light"
        onClick={increaseVotes}
        size={25}
      />
      <p className="vote-text text-light"> {votes} Likes </p>
      <BsFillHandThumbsDownFill
        onClick={decreaseVotes}
        size={25}
        className="text-light"
      />
    </div>
  );
}

export default VideoLikes;
