import React, { useState } from "react";

const CountLike = ({setRating}) => {
  const [upvote, setUpvote] = useState(0);
  const [downvote, setDownvote] = useState(0);
  const handleUpvote = () => {
    setRating(prev => prev + 1);
    setUpvote((prev) => prev + 1);
  };

  const handleDownvote = () => {
    setRating((prev) => prev - 1);
    setDownvote((prev) => (downvote < 0 ? 0 : prev + 1));
  };

  return (
    <div>
      <button className="buttons" onClick={handleUpvote}>
        👍 {upvote}
      </button>
      <button className="buttons" onClick={handleDownvote}>
        👎{downvote}
      </button>
    </div>
  );
};

export default CountLike;
