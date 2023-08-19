import React from "react";

export default function Video(props) {
  console.log(props.title);
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
      <div>Rating: {props.rating}</div>
      <button onClick={() => props.handleClick(props.id)}>Remove Video</button>
    </div>
  );
}
