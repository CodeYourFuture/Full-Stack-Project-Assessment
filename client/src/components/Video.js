import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

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
        src={props.url}
        title={props.title}
      ></iframe>
      <p>
        <Badge pill bg="primary">
          votes {votes}
        </Badge>{" "}
      </p>
      <Button variant="success" style={{ margin: "6px" }} onClick={voteUp}>
        Up Vote
      </Button>
      <Button variant="danger" style={{ margin: "6px" }} onClick={voteDown}>
        Down Vote
      </Button>
      <Button variant="dark" style={{ margin: "6px" }} onClick={removeVideo}>
        Remove Video
      </Button>
    </div>
  );
}

export default Video;