import React, { useState } from 'react';

function Video({ video, onRemove}) {
    const [votes, setVotes] = useState(video.rating);
}

const handleVote = () => {
    setVotes(prevVotes => prevVotes + 1);
  };