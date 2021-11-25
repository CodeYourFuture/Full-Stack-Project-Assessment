import React from "react";
import VoteComp from "./voteComp";

const VideoContainer = ({ Response,handleDelete }) => {
  return (
    <div className="App-card d-flex justify-content-around flex-wrap">
      {Response.map((sample, index) => (
        <div key={index} className="card border-warning mb-3">
          <div className="card-body">
            <h4>{sample.title}</h4>
            <div name={sample.title}>
              <VoteComp />
            </div>
            <div>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube-nocookie.com/embed/${sample.url.substring(
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
