import React from "react";

const LikeBtn = (props) => {
  return (
    <i
      className={props.class}
      id="like-dislike"
      data-value={props.vote}
      onClick={props.votehandler}
    ></i>
  );
};

export default LikeBtn;
