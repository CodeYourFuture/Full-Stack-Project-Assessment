import React from "react";

function Videos(props) {
    return (
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${props.video}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    );
}
export default Videos