import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({ videos, onVote, onRemove }) => {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <VideoItem
          key={video.id}
          video={video}
          onVote={onVote}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default VideoList;
