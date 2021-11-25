import React, { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";

const VideoContainer = ({ Response,handleDelete }) => {
  const [voteCounts,setVoteCounts] = useState(0);
  const VoteUp = ()=>{
    setVoteCounts(voteCounts + 1);
  }
  const VoteDown = ()=>{
    setVoteCounts(voteCounts - 1);
  }
  return (
    <div className="App-card d-flex justify-content-around flex-wrap">
      {Response.map((sample, index) => (
        <div key={index} className="card border-warning mb-3">
          <div className="card-body">
            <h4>{sample.title}</h4>
            <div className="d-flex justify-content-around">
              <FaThumbsUp onClick={VoteUp} />
              <h3>{voteCounts} VOTE</h3>
              <FaThumbsDown onClick={VoteDown} />
            </div>
            <div>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${sample.url.substring(
                  sample.url.length - 11
                )}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <h5>rating</h5>
          <div>
            <button
              name={sample.title}
              onClick={handleDelete}
              className="btn btn-secondary btn-sm"
            >
              DELETE
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoContainer;
