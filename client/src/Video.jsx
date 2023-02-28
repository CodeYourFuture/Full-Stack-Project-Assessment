import React, { useState } from "react";

function Video(props) {
  const [votes, setVotes] = useState(props.votes);

  const voteUp = () => {
    setVotes(votes + 1);
  };

  const voteDown = () => {
    setVotes(votes - 1);
  };

  const removeVideo = () => {
    props.onVideoRemoved(props.id);
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <iframe
        width="560"
        height="315"
        src={props.src}
        title={props.title}
      ></iframe>
      <p>{votes} votes</p>
      <button onClick={removeVideo}>Remove Video</button>
      <button onClick={voteUp}>Up Vote</button>
      <button onClick={voteDown}>Down Vote</button>
    </div>
  );
}

export default Video;