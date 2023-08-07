import React from "react";
import "./Video.css";

const Video = ({ video, onVoteUp, onVoteDown, onRemove }) => {
  const videoId = extractVideoIdFromUrl(video.url);

  return (
    <div className="video">
      <h2>{video.title}</h2>
      <iframe
        title={video.title}
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="vote">
        <button onClick={onVoteUp}>&#128077; Up</button>
        <span>{video.votes}</span>
        <button onClick={onVoteDown}>&#128078; Down</button>
      </div>
      <button onClick={onRemove}>Remove Video</button>
    </div>
  );
};

function extractVideoIdFromUrl(url) {
  const regex = /[?&]v=([^?&]+)/;
  const match = url.match(regex);
  return match ? match[1] : "";
}

export default Video;
