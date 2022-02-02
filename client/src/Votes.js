import React, { useState } from "react";
export default function Votes() {
  // Like handler
  const [Like, setLike] = useState(0);
  const likeHandler = () => {
    setLike((vote) => vote + 1);
  };
  // Dislike handler
  const [DisLike, setDisLike] = useState(0);
  const disLikeHandler = () => {
    setDisLike((vote) => vote + 1);
  };
  return (
    <div className="thumbs">
      {/* Like Thumb */}

      <h5 className="votes">{Like}</h5>

      <i className="fas fa-thumbs-up" onClick={likeHandler}></i>

      {/* Dislike Thumb */}

      <h5 className="votes">{DisLike}</h5>

      <i className="fas fa-thumbs-down" onClick={disLikeHandler}></i>
    </div>
  );
}
