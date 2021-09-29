import React from "react";

const IFrame = (props) =>
{
    return(
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${props.embed}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
    )
}

export default IFrame;