import React from "react";

const VideoVotingButtons = ({ rating, setRating }) => {
  const upVoteVideo = () => setRating((rating) => rating + 1);
  const downVoteVideo = () => setRating((rating) => rating - 1);

  return (
    <div>
      <button onClick={upVoteVideo}>Up Vote</button>
      <span> {rating} </span>
      <button onClick={downVoteVideo}>Down Vote</button>
    </div>
  );
};

export default VideoVotingButtons;
