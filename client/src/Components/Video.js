import React, { useState } from "react";
import LikeDislike from "../Buttons/LikeDislikeBtn";
import EmbedYoutube from "./EmbedYoutube";
import VideoCard from "./VideoCard";

const Video = ({ video, handleDelete }) => {
  return (
    <div className="videos-container">
      <div className = "video-body">
      <h2>{video.title}</h2>
      <LikeDislike />
      <EmbedYoutube video = {video} /> 
      <button
        className="btn btn-default"
        onClick={() => {
          handleDelete(video.id);
        }}
      >
        Delete Video
      </button>
      </div>
    </div>
  );
};

export default Video;
