import React from "react";

function Video({ video, onRemove, onUpVote, onDownVote }) {
  return (
    <div>
      <h2>{video.title}</h2>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${video.id}`}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <p>Rating: {video.rating}</p>
      <button onClick={onUpVote}>Up Vote</button>
      <button onClick={onDownVote}>Down Vote</button>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}

export default Video;
