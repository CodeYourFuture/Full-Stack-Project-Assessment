import { useState } from "react";

const VoteComponent = () => {
  const [vote, setVote] = useState(0);

  const handleIncrement = () => {
    setVote((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setVote((prevCount) => prevCount - 1);
  };

  return (
    <section className="vote-container">
      <i className="fa fa-thumbs-up" onClick={() => handleIncrement()}></i>
      <p>Likes: {vote}</p>
      <i className="fa fa-thumbs-down" onClick={() => handleDecrement()}></i>
    </section>
  );
};

export default VoteComponent;
