import React from "react";

function DislikeButton({ decrementLikeClick }) {
  return (
    <div>
      <button className="dislike-button" onClick={() => decrementLikeClick()} aria-label="dislike-button">
        Dislike <i className="fa fa-thumbs-down"></i>
      </button>
    </div>
  );
}

export default DislikeButton;
