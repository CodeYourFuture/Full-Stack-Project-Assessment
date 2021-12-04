import React, { useState } from "react";

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
      <i className="fa fa-thumbs-up" onClick={increaseVotes}></i>
      <p> {votes} Likes </p>
      <i className="fa fa-thumbs-down" onClick={decreaseVotes}></i>
    </div>
  );
}

export default VideoLikes;
