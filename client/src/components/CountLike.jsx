import React, { useState } from "react";

const CountLike = () => {
  const [upvote, setUpvote] = useState(0);
  const [downvote, setDownvote] = useState(0);
  const handleUpvote = () => {
    setUpvote((prev) => prev + 1);
  };

  const handleDownvote = () => {
    setDownvote((prev) => (downvote < 0 ? 0 : prev + 1));
  };

  return (
    <div>
      <button onClick={handleUpvote}>👍 {upvote}</button>
      <button onClick={handleDownvote}>👎{downvote}</button>
    </div>
  );
};

export default CountLike;
