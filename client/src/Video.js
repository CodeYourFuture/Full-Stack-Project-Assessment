import React, { useState } from "react";
import DeleteButton from "./buttons/DeleteButton";
import LikeIcon from "./buttons/LikeIcon";
import DislikeIcon from "./buttons/DislikeIcon";
import YouTubeEmbed from "./YouTubeEmbed";
import "bootstrap/dist/css/bootstrap.css";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

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
    <ImageListItem className="video-container">
      <YouTubeEmbed video={video} />
      <ImageListItemBar title={video.title} position="below" />
      <div className="vote-container">
        <LikeIcon handleLike={handleLike} />
        <p>{votes} Vote </p>
        <DislikeIcon handleDisLike={handleDisLike} />
      </div>
      <DeleteButton vidId={vidId} deleteVideo={deleteVideo} />
    </ImageListItem>
  );
}

export default Video;
