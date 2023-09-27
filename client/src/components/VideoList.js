import React from 'react';
import Video from './Video';

const VideosList = ({ videos, handleVote, handleRemove }) => {
  return (
    <div>
      {videos.map(video => (
        <Video
          key={video.id}
          video={video}
          handleVote={handleVote}
          handleRemove={handleRemove}
        />
      ))}
    </div>
  );
};

export default VideosList;