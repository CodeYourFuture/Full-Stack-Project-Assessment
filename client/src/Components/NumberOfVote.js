import { useState } from "react";
import "./NumberOfVote.css";

function NumberOfVote(props) {
  const [count, setCount] = useState(props.video.rating);
  const countUp = () => {
    setCount(count + 1);
  };
  const countDown = () => {
    setCount(count - 1);
  };
  return (
    <div className="votes">
      <button className="like-button" onClick={countUp}>
        Like
      </button>
      <div className="counter"> {count} votes</div>
      <button className="dislike-button" onClick={countDown}>
        Dislike
      </button>
    </div>
  );
 }
export default NumberOfVote;
