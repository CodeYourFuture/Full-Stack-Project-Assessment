import React, { useState } from "react";
import LikeButton from "../Buttons/LikeButton";
import DislikeButton from "../Buttons/DislikeButton";
import YoutubeEmbed from "./YoutubeEmbed";

function Video({ id, video, deleteVideo }) {
  const [rating, setRating] = useState(video.rating);
  const incrementLikeClick = () => {
    setRating(rating + 1);
    fetch(`/videos/uprating/${video.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: video.id }),
    });
  };
  const decrementLikeClick = () => {
    setRating(rating - 1);
    fetch(`/videos/downrating/${video.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: video.id }),
    });
  };

  return (
    <div className="video-container">
      <p className="video_title">{video.title}</p>
      <div className="vote-container">
        <LikeButton incrementLikeClick={incrementLikeClick} />
        <p className="rating"> {rating} Vote</p>
        <DislikeButton decrementLikeClick={decrementLikeClick} />
      </div>
      <YoutubeEmbed video={video} />
      <button
        className="btn btn-danger"
        onClick={() => {
          deleteVideo(video.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Video;
