import React, { useState } from "react";

function Rating(props) {
  const [vote, setVote] = useState(props.rating);

  function handleClickUpVote() {
    setVote((previousVote) => previousVote + 1);
  }

  function handleClickDownVote() {
    setVote((previousVote) => previousVote - 1);
  }
  return (
    <div>
      <div className="rating">
        <button onClick={handleClickUpVote}>UpVote</button>
        <p>{vote}</p>
        <button onClick={handleClickDownVote}>DownVote</button>
      </div>
    </div>
  );
}

export default Rating;
