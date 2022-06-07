import { useState } from "react";
import UpVoteButton from "./UpVoteButton";
import DownVoteButton from "./DownVoteButton";

const Votes = (props) => {
  const [counter, setCounter] = useState(props.rating);

  return (
    <div className="votes-div">
      <p>{counter} likes</p>
      <UpVoteButton counter={counter} setCounter={setCounter} />
      <DownVoteButton counter={counter} setCounter={setCounter} />
    </div>
  );
};
export default Votes;
