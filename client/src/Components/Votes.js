import { useState } from "react";
import UpVoteButton from "./UpVoteButton";
import DownVoteButton from "./DownVoteButton";

const Votes = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <p>{counter}</p>
      <DownVoteButton counter={counter} setCounter={setCounter} />
      <UpVoteButton counter={counter} setCounter={setCounter} />
    </div>
  );
};
export default Votes;
