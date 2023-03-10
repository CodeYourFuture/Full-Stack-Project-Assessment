import React from "react";

const Video = ({ title, rating, url }) => {
  return (
    <div className="video">
      <h5>{title}</h5>
      <div>
        <span>&#x1F44D;</span>
        {rating}
        <span>&#x1F44E;</span>
      </div>
      <iframe
        width="300"
        height="205"
        src={`https://www.youtube.com/embed/${url}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <br />
      <button>Delete</button>
    </div>
  );
};

export default Video;
