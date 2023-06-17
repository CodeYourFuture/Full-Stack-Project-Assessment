import React, { useState } from "react";

function Votes() {
  const [like, setLike] = useState(0);

  const handleLike = () => {
    setLike(like + 1);
  };
  const [dislike, setDislike] = useState(0);

  const handleDislike = () => {
    setDislike(dislike + 1);
  };

  return (
    <div className="thumbs">
      <p>Votes: {like}</p>

      <i className="fa fa-thumbs-up" onClick={handleLike}></i>
      {/*Dislike Thumb*/}

      <p>Votes: {dislike}</p>
      <i className="fa fa thumbs-down" onClick={handleDislike}></i>
    </div>
  );
}

export default Votes;
