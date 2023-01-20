import React from "react";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { BsFillHandThumbsDownFill } from "react-icons/bs";
import "./LikeDislikeButton.css";

function LikeDislikeButton({ rating, handleIncrement, handleDecrement }) {
  return (
    <div className="like-dislike">
      <span onClick={() => handleIncrement()}>
        <BsFillHandThumbsUpFill className="icon " />
      </span>
      <h4>{rating}</h4>
      <span onClick={() => handleDecrement()}>
        <BsFillHandThumbsDownFill className="icon" />
      </span>
    </div>
  );
}

export default LikeDislikeButton;
