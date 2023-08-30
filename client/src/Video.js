import React from "react";

const Video = ({ video, onUpVote, onDownVote, onRemove }) => {
  let videoID = video.url.split("=")[1];
  return (
    <div className="video">
      <h3>{video.title}</h3>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoID}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <p>Votes: {video.votes}</p>
      <button onClick={() => onUpVote(video)}>Up Vote</button>
      <button onClick={() => onDownVote(video)}>Down Vote</button>
      <button onClick={() => onRemove(video)}>Remove</button>
    </div>
  );
};

export default Video;
