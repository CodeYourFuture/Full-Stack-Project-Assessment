import React from "react";
import Rating from "./Rating";
import "../App.css";

const Video = (props) => {
  return (
    <div className="videoContainer">
      <h5 className="videoTitle">{props.title}</h5>
      <video width="400" controls className="videoPlay">
        <source src={props.url} />
      </video>
      <div className="rateAndTimeContainer">
        <p>{props.timestamp}</p>
        <Rating />
      </div>
    </div>
  );
};

export default Video;
