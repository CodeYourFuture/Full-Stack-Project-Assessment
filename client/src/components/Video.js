import React from "react";

function Video({ urlVideo }) {
  return (
    <div className="video-responsive">
      <iframe
        width="360"
        height="315"
        src={`https://www.youtube.com/embed/${urlVideo}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

export default Video;