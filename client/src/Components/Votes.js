import { useState } from "react";
import UpVoteButton from "./UpVoteButton";
import DownVoteButton from "./DownVoteButton";

const Votes = (props) => {
  const { rating } = props;
  const [counter, setCounter] = useState(rating);

  return (
    <div className="votes-div">
      <p>{rating} likes</p>
      {/* <span className="like-dislike-buttons"> */}
      <UpVoteButton counter={counter} setCounter={setCounter} />
      <DownVoteButton counter={counter} setCounter={setCounter} />
      {/* </span> */}
    </div>
  );
};
export default Votes;
