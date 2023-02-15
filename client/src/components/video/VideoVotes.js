import React, { useState } from "react";

const VideoVotes = () => {

  const [votes, setVotes] = useState(0);

  const increaseVotes = () => {
    setVotes(votes + 1);
  };
  
  const decreaseVotes = () => {
    if (votes > 0) {
      setVotes(votes - 1);
    }
  };
  return (
    <div className="vote-icons">
      <i class="fa-thin fa-thumbs-up" onClick={increaseVotes}></i>
      <i class="fa-thin fa-thumbs-down" onClick={decreaseVotes}></i>
    </div>
  );
};

export default VideoVotes;
