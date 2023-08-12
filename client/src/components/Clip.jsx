import React from "react";
import ReactPlayer from "react-player";

const Clip = ({ id, title, url, rating }) => {
  return (
    <div className="video-player">
      <div key={id} className="video-embed">
        <p>{title}</p>
        <ReactPlayer url={url} controls={true} width="560px" height="315px" />
      </div>
      <div className="video-info">
        <p className="video-category">Category 1</p>
        <div className="video-likes-dislikes">
          <span className="like-button">👍</span>
          <span className="dislike-button">👎</span>
          <span>{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default Clip;
