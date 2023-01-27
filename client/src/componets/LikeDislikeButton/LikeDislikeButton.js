import React from "react";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { BsFillHandThumbsDownFill } from "react-icons/bs";
import "./LikeDislikeButton.css";

function LikeDislikeButton({ rating, handleIncrement, handleDecrement }) {
  return (
    <div className="like-dislike">
      <span onClick={() => handleIncrement()}>
        <BsFillHandThumbsUpFill className="icon  like " />
      </span>
      <h4>{rating}</h4>
      <span onClick={() => handleDecrement()}>
        <BsFillHandThumbsDownFill className="icon dislike" />
      </span>
    </div>
  );
}

export default LikeDislikeButton;
