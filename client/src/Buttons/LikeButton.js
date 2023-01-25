import React from "react";

function LikeButton({ incrementLikeClick }) {
  return (
    <div>
      <button onClick={() => incrementLikeClick()}>
        Like <i className="fa fa-thumbs-up"></i>
      </button>
    </div>
  );
}

export default LikeButton;
