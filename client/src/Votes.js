import React, { useState } from "react";
import 'font-awesome/css/font-awesome.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

function Votes() {
  const [Like, setLike] = useState(0);

  const handleLike = () => {
    setLike(Votes + 1);
  };
  const [Dislike, setDislike] = useState(0);

  const handleDislike = () => {
    setDislike(Votes + 1);
  };

  return (
    <div className="thumbs">
      <p>Votes: {Like}</p>

      <button onClick={handleLike}>
      👍🏻            </button>
      {/*Dislike Thumb*/}

      <p>Votes: {Dislike}</p>
      <i className="fa fa thumbs-down" onClick={handleDislike}></i>
    </div>
  );
}

export default Votes;