import React from 'react';

const Video = ({ video, handleVote, handleRemove }) => {
  return (
    <div>
      <h2>{video.title}</h2>
      <iframe
        width="560"
        height="315"
        src={video.url}
        title={video.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <p>Votes: {video.rating}</p>
      <button onClick={() => handleVote(video.id, 'up')}>Up Vote</button>
      <button onClick={() => handleVote(video.id, 'down')}>Down Vote</button>
      <button onClick={() => handleRemove(video.id)}>Remove Video</button>
    </div>
  );
};

export default Video;