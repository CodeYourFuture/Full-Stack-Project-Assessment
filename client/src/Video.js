import React from "react";
import LikeBtn from "./LikeBtn";
import Delete from "./Delete";

const Video = (props) => {
  return (
    <li key={props.key}>
      <div className="like-title-container">
        <h2>{props.title}</h2>
        <div className="like-button-container">
          <LikeBtn />
          <h3>votes</h3>
          <LikeBtn />
        </div>
      </div>
      <iframe
        width="560"
        height="315"
        src={props.url}
        title={props.title}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <Delete delete={props.delete} id={props.id}/>
    </li>
  );
};

export default Video;
