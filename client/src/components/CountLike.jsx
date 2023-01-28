import React, { useState } from "react";

const CountLike = () => {
  const [upvote, setUpvote] = useState(3);
  const [downvote, setDownvote] = useState(2);
  const handleUpvote = () => {
    setUpvote((prev) => prev + 1);
    // setDownvote((prev) => prev - 1);
  };

  const handleDownvote = () => {
    setDownvote((prev) => (prev > 0 ? prev + 1 : 0));
    // setUpvote((prev) => prev + 1);
  };

  return (
    <div>
      <button onClick={handleUpvote}>👍 {upvote}</button>
      <button onClick={handleDownvote}>👎{downvote}</button>
    </div>
  );
};

export default CountLike;
