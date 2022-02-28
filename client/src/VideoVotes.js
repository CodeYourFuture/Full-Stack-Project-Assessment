import React, { useState } from "react";

export default function VideoVotes() {
  // Like handler
  const [vote, setVote] = useState(0);
  const likeHandler = () => {
    setVote((vote) => vote + 1);
  };

  // Dislike handler
  const disLikeHandler = () => {
    setVote((vote) => (vote === 0 ? 0 : vote - 1));
  };
  return (
    <div className="thumbs">
      {/* Like Thumb */}
      <i className="fas fa-thumbs-up" onClick={likeHandler}></i>
      <h5 className="votes">{vote}</h5>
      {/* Dislike Thumb */}
      <i className="fas fa-thumbs-down" onClick={disLikeHandler}></i>
    </div>
  );
}
