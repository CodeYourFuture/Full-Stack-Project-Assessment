import React from 'react';

const VideoItem = ({ video, onVote, onRemove }) => {
  const { title, url, votes } = video;

  const handleVote = (isUpVote) => {
    onVote(video, isUpVote);
  };

  const handleRemove = () => {
    onRemove(video);
  };

  return (
    <div className="video-item">
      <h3>{title}</h3>
      <div>
        <iframe title={title} src={url} width="560" height="315" frameBorder="0" allowFullScreen></iframe>
      </div>
      <p>Votes: {votes}</p>
      <button onClick={handleRemove}>Remove</button>
      <button onClick={() => handleVote(true)}>Up Vote</button>
      <button onClick={() => handleVote(false)}>Down Vote</button>
    </div>
  );
};

export default VideoItem;
