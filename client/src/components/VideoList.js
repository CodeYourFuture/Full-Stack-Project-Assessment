import React from 'react';


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