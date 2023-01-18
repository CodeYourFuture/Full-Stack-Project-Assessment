import React, { useState } from "react";
import LikeButton from "../Buttons/LikeButton";
import DislikeButton from "../Buttons/DislikeButton";
import DeleteButton from "../Buttons/DeleteButton";
import YoutubeEmbed from "./YoutubeEmbed";

function Video({ video }) {

  const [rating, setRating] = useState(video.rating);
  
  const incrementLikeClick = () => {
    setRating(rating + 1);
  };
  const decrementLikeClick = () => {
    setRating(rating - 1);
  };
  return (
    <div className="video-container">
      <p>{video.title}</p>
      <div className="vote-container">
        <LikeButton incrementLikeClick={incrementLikeClick} />
        <p> {rating} Vote</p>
        <DislikeButton decrementLikeClick={decrementLikeClick} />
      </div>
      <YoutubeEmbed video={video} />
      <DeleteButton />
    </div>
  );
}

export default Video;
