import React, { useState } from "react";
import Dislike from "./VideoDislike";
import Like from "./VideoLike";

const Voting = () => {
  const [videoLikes, createVideoLikes] = useState(0);

  function VideoLiked() {
    createVideoLikes(videoLikes + 1);
  }

  function VideoDisliked() {
    createVideoLikes(videoLikes - 1);
  }
  return (
    <div className="votes">
      <Like voteUp={VideoLiked} />
      <h4>Votes: {videoLikes}</h4>
      <Dislike voteDown={VideoDisliked} />
    </div>
  );
};

export default Voting;
