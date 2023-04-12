import React from "react";
import ReactPlayer from "react-player";

const ReactPlayers = ({ orl }) => {
  return (
    <div className="cardSpan1">
      <span className="spanCard">
        <ReactPlayer controls url={orl} width="400px" height="230px" />
      </span>
    </div>
  );
};
export default ReactPlayers;
