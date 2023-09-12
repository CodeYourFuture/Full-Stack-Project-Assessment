import { useState } from "react";
const CountVotes = () => {
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);
  const handleUpVote = () => {
    setUpVote(upVote + 1);
  };
  const handleDownVote = () => {
    setDownVote(upVote - 1);
  };
  return (
    <div className="mainConteiner">
      <div >
        <span>{upVote}</span>
        <button onClick={handleUpVote}>Up Vote</button>
      </div>
      <div>
        <span>{downVote}</span>
        <button onClick={handleDownVote}>Down Vote</button>
      </div>
    </div>
  );
};

export default CountVotes;
