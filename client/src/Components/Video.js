import React, { useState } from "react";
import LikeDislike from "../Buttons/LikeDislikeBtn";
import EmbedYoutube from "./EmbedYoutube";

const Video = ({ video, handleDelete }) => {
  return (
    <div>
      <h2>{video.title}</h2>
      <div>
        <LikeDislike />
      </div>
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
  );
};

export default Video;
