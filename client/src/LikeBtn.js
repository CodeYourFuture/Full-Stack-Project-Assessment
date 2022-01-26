import React from "react";

const LikeBtn = (props) => {
  return (
    <button className="like-dislike" onClick={props.votehandler} value={props.vote}>
      {props.vote}
    </button>
  );
};

export default LikeBtn;
