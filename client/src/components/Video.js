import React from "react";
import Rating from "./Rating";

export default function Video(props) {
  const videoId = props.url.replace("https://www.youtube.com/watch?v=", "");
  return (
    <div className="videoContainer column">
      <h1>{props.title}</h1>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/{videoId}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <Rating
        rating={props.rating}
        id={props.id}
        handleClickAdd={props.handleClickAdd}
        handleClickMinus={props.handleClickMinus}
      />
      <button onClick={() => props.handleClickDelete(props.id)}>
        Remove Video
      </button>
    </div>
  );
}
