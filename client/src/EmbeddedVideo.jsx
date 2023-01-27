import React from "react";

function EmbeddedVideo(props) {
  const url = props.url.replace("watch?v=", "embed/");
  return (
    <iframe
      title={props.title}
      width="560"
      height="315"
      src={url}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

export default EmbeddedVideo;
