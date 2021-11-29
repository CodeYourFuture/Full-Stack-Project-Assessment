import React from "react";
import VoteComp from "./voteComp";

const VideoContainer = ({ allVideo, setAllVideo }) => {
  const HandleDelete = (event) => {
    event.preventDefault();
    const name = event.target.getAttribute("name");
    setAllVideo((allVc)=>allVc.filter((vc) => vc.id !== Number(name)));
  };
  const eachVideo = allVideo.map((sample) => {
    return (
      <li key={sample.id} className="card border-warning mb-3">
        <h4 className="card-body">{sample.title}</h4>
        <VoteComp />
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
        <h5>rating</h5>
        <button
          name={sample.id}
          onClick={HandleDelete}
          className="btn btn-secondary btn-sm"
        >
          DELETE
        </button>
      </li>
    );
  });

  return (
    <ul className="App-card d-flex justify-content-around flex-wrap">
      {eachVideo}
    </ul>
  );
};

export default VideoContainer;
