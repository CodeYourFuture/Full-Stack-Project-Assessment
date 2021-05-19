import React, { useState } from "react";

const Votes = ({ rating }) => {
  let [votes, setVotes] = useState(rating);
  const voteCount = (elem) => {
    // rating will not less than 0
    if (votes > 0) {
      if (elem.target.className === "fa fa-thumbs-up fa-2x") {
        setVotes((votes = votes + 1));
      } else {
        setVotes((votes = votes - 1));
      }
    } 
    // when rating is 0, only thumb up will work
    else {
      if (elem.target.className === "fa fa-thumbs-up fa-2x") {
        setVotes((votes = votes + 1));
      }
    }
  };

  return (
    <div id="votesContainer">
      <i className="fa fa-thumbs-up fa-2x" onClick={voteCount}></i>
      <h5>{votes} votes</h5>
      <i className="fa fa-thumbs-down fa-2x" onClick={voteCount}></i>
    </div>
  );
};

export default Votes;
