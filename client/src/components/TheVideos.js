import React, { useState } from "react";
import Package from "../data/exampleresponse.json";
import ReactPlayers from "./ReactPlayers";

const TheVideos = () => {
  // const [videos, setVideos] = useState([]);
  const [allVoted, setAllVoted] = useState(0);

  const handleClick = () => {
    setAllVoted(allVoted + 1);
  };
  return (
    <span>
      {Package.map((lik, i) => {
        return (
          <div className="allVideos" key={i}>
            <h2>{lik.title}</h2>
            <p>{lik.id}    "      {lik.rating}</p>
            
              <button id="local"
                onClick={handleClick}
                type="button"
                class="btn btn-primary"
              >            like{" "}  : {allVoted}
              </button>
            
            <ReactPlayers url={lik.url} />
          </div>
        );
      })}
    </span>
  );
};
export default TheVideos;
