import React from 'react';

export default function Rating({ video, handleVote, handleRemove }) {
  return (
    <div className="rating">
      <p>Votes: {video.votes}</p>
      <button onClick={() => handleVote(video.id, 1)}>Up Vote</button>
      <button onClick={() => handleVote(video.id, -1)}>Down Vote</button>
      <button onClick={() => handleRemove(video.id)}>Remove</button>
    </div>
  );
}
