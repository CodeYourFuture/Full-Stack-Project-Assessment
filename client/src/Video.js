import React from "react";
import Rating from "./Rating";
import "./App.css";

const Video = (props) => {
  return (
    <>
      <h4>{props.title}</h4>
      <Rating />
      <video width="400" controls>
        <source src={props.url} />
      </video>
    </>
  );
};

export default Video;
