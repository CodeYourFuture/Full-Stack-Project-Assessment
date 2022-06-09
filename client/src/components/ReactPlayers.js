import React, { useState } from "react";
//import NewVideos from "./NewVideos";
import ReactPlayer from "react-player";

const ReactPlayers = ({ orl }) => {
  const [addVoted, setAddVoted] = useState(0);

  const buttonClick = () => {
    setAddVoted(substract => substract - 1);
  };
  return (<div>
   
    <span className="spanCard">
      <ReactPlayer controls   url={orl} width="480px" height="240px" />
      

      <button onClick={buttonClick} type="button" className="btn btn-danger">
        Dislike {<i className="fas fa-thumbs-up"></i>} : {addVoted}

      </button>
    </span></div>
  );
};
export default ReactPlayers;
