import React from "react";
import Votes from "./Votes";

const Video = (props) => {
  return (
    <div className="video">
      <h5>{props.videoTitle}</h5>
      <Votes />
      <iframe
        width="560"
        height="315"
        src={props.url.replace("watch?v=", "embed/")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default Video;
