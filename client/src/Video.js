import React, { useState } from "react";
import DeleteButton from "./buttons/DeleteButton";
import LikeIcon from "./buttons/LikeIcon";
import DislikeIcon from "./buttons/DislikeIcon";
import YouTubeEmbed from "./YouTubeEmbed";
import "bootstrap/dist/css/bootstrap.css";

function Video({ id, title, url, rating, videoData, setVideoData }) {
  const [ratings, setRatings] = useState(rating);
  return (
    <div className="video-container">
      <p>{title}</p>
      <div className="vote-container">
        <LikeIcon ratings={ratings} setRatings={setRatings} />
        <p>
          <span>{ratings}</span> Vote
        </p>
        <DislikeIcon ratings={ratings} setRatings={setRatings} />
      </div>
      <YouTubeEmbed url={url} title={title} />
      <DeleteButton
        videoData={videoData}
        setVideoData={setVideoData}
        id={id}
      />
    </div>
  );
}

export default Video;
