import React, { useState } from "react";
import DeleteButton from "./buttons/DeleteButton";
import LikeIcon from "./buttons/LikeIcon";
import DislikeIcon from "./buttons/DislikeIcon";
import YouTubeEmbed from "./YouTubeEmbed";
import "bootstrap/dist/css/bootstrap.css";

function Video({ vidId, video, deleteVideo, updateRatings }) {
  const [votes, setVotes] = useState(video.rating);

  const handleLike = () => {
    console.log("A", votes);
    setVotes(votes + 1);
    updateRatings(votes, vidId);
  };

  const handleDisLike = () => {
    console.log("B", votes);
    setVotes(votes - 1);
    updateRatings(votes, vidId);
  };

  return (
    <div className="video-container">
      <p>{video.title}</p>
      <div className="vote-container">
        <LikeIcon handleLike={handleLike} />
        <p>{votes} Vote </p>
        <DislikeIcon handleDisLike={handleDisLike} />
      </div>
      <YouTubeEmbed video={video} />
      <DeleteButton vidId={vidId} deleteVideo={deleteVideo} />
    </div>
  );
}

export default Video;
