import React from "react";
import DeleteButton from "./buttons/DeleteButton";
import LikeIcon from "./buttons/LikeIcon";
import DislikeIcon from "./buttons/DislikeIcon";
import YouTubeEmbed from "./YouTubeEmbed";
import "bootstrap/dist/css/bootstrap.css";

function Video({ id, title, url, rating, videoData, setVideoData }) {
  return (
    <div className="video-container">
      <p>{title}</p>
      <div className="vote-container">
        <LikeIcon />
        <p>0 Vote</p>
        <DislikeIcon />
      </div>
      <YouTubeEmbed url={url} title={title} />
      <DeleteButton
        videoData={videoData}
        SetVideoData={setVideoData}
        id={id}
      />
    </div>
  );
}

export default Video;
