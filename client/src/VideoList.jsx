import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({ videos, onDelete, voteUp, voteDown, onVote }) => {


      // Sort the videos in descending order based on votes
      const sortedVideos = [...videos].sort((a, b) => b.rating - a.rating);

  return (
    <div className="video-list">

      {sortedVideos.map((video) => (
        <VideoItem
          key={video.id}
          video={video}
          voteUp={voteUp}
          voteDown={voteDown}
          onDelete={onDelete} 
          onVote={onVote}
          />
      ))}
    </div>
  );
};

export default VideoList;

