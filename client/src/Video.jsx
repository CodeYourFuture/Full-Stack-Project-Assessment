import React, { useState } from 'react';

function Video({ video, onRemove}) {
    const [votes, setVotes] = useState(video.rating);
}

const handleVote = () => {
    setVotes(prevVotes => prevVotes + 1);
  };

  return (
    <div className="video">
      <h2>{video.title}</h2>
      <iframe width="560" height="315" src={video.url} frameBorder="0" allowFullScreen></iframe>
      <p>Votes: {votes}</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={() => onRemove(video.id)}>Remove</button>
    </div>
  );
}