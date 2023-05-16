import React from "react";
import ReactPlayer from "react-player";

const VideoItem = ({ video, onRemove }) => {
  const { id, title, url, rating } = video;
  const handleRemove = () => {
    onRemove(id);
  };
  return (
    <div className="video-item">
      <h2>{title}</h2>
      <ReactPlayer url={url} controls />
      {/* <iframe
        width="560"
        height="315"
        src={url}
        title={title}
        frameborder="0"
        allowfullscreen
      ></iframe> */}
      <p>Votes: {rating}</p>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};
export default VideoItem;
