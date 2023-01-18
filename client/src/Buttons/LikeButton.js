import React from "react";

function LikeButton({ incrementLikeClick }) {
  return (
    <div>
      <button onClick={() => incrementLikeClick()}>
        Like <i class="fa fa-thumbs-up"></i>
      </button>
    </div>
  );
}

export default LikeButton;
