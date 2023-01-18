import React from "react";

function DislikeButton({ decrementLikeClick }) {
  return (
    <div>
      <button onClick={() => decrementLikeClick()} aria-label="dislike-button">
        Dislike <i class="fa fa-thumbs-down"></i>
      </button>
    </div>
  );
}

export default DislikeButton;
