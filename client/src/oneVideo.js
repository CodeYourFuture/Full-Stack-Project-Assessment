import React from "react";
import Voting from "./voting";
const Videolink = (props) => {
  return (
    <div className="onevideo">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${props.video.url.split("=")[1]}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <Voting />
    </div>
  );
};

export default Videolink;
