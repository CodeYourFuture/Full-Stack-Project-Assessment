import React, { useState } from "react";

const Voting = () => {
  const [votes, setVotes] = useState(0);

  const Votesup = () => setVotes(votes + 1);
  const Votesdown = () => {
    if (votes > 0) setVotes(votes - 1);
  };

  return (
    <div className=" container" style={{ marginLeft: "50px" }}>
      <button
        onClick={Votesup}
        style={{ margin: "50px" }}
        type="button"
        className="btn btn-info"
      ></button>

      <p style={{ margin: "50px" }}>{votes}</p>
      <button
        onClick={Votesdown}
        style={{ margin: "50px" }}
        type="button"
        className="btn btn-danger"
      ></button>
    </div>
  );
};
export default Voting;
