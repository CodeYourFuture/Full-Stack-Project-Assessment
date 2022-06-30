import React from "react";
import Rating from "./Rating";

function Video(props) {
  const deleteHandler = () => {
    props.delete(props.videoId);
  };

  return (
    <div className="video">
      <h4>{props.title}</h4>
      <Rating />
      <iframe
        width="560"
        height="315"
        src={props.url}
        title={props.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <button onClick={deleteHandler} type="button">
        Delete Video
      </button>
      <hr />
    </div>
  );
}

export default Video;
