import React, { useState } from "react";
import ReactPlayer from "react-player";

const ReactPlayers = ({ url }) => {
  const [addVoted, setAddVoted] = useState(0);

  const buttonClick = () => {
    setAddVoted(addVoted - 1);
  };
  return (
    <span class="spanCard">
      <ReactPlayer controls url={url} width="480px" height="240px" />
      <button onClick={buttonClick} type="button" class="btn btn-primary">
        Dislike : {addVoted}

      </button>
    </span>
  );
};
export default ReactPlayers;
