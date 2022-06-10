import React from "react";

const YouTubeVideo = (props) => {
  return (
    <div className="card">
      <h5 className="card-title">{props.videoTitle}</h5>
      <iframe
        className="card-img-top"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${props.videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      />
    </div>
  );
};

export default YouTubeVideo;
