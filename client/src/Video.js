import React, { useState } from "react";
import YouTubeURL from "./YouTubeURL.js";
import LikeButton from "./LikeButton.js";
import DisLikeButton from "./DisLikeButton.js";
import DeleteButton from "./DeleteButton.js";

function Video({ video, removeVid }) {
  const [votes, setVotes] = useState(video.rating);
  const increment = () => {
    setVotes(votes + 1);
  };
  const decrement = () => {
    setVotes(votes - 1);
  };

  return (
    <div>
      <div className="video-container">
        <p>{video.title}</p>
        <DeleteButton removeVid={removeVid} id={video.id} />
        <YouTubeURL video={video} />
        <LikeButton increment={increment} />
        <p>{votes}</p>
        <DisLikeButton decrement={decrement} />
      </div>
    </div>
  );
}

export default Video;
