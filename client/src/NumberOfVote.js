import React, { useState } from "react";

function NumberOfVote(props) {
  const [count, setCount] = useState(props.video.rating);
  const countUp = () => {
    setCount(count + 1);
  };
  const countDown = () => {
    setCount(count - 1);
  };
  return (
    <div>
      <div className="counter"> {count} votes</div>
      <button onClick={countUp}>Like</button>
      <button onClick={countDown}>Dislike</button>
    </div>
  );
 }
export default NumberOfVote;
