import React, { useState } from "react";
import LikeDislike from "../Buttons/LikeDislikeBtn";
import EmbedYoutube from "../Buttons/EmbedYoutube";
import VideoCard from "./VideoCard";

const Video = (props) => {
  function handleDelete(id) {
    fetch(`/videos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    window.location.reload();
  }

  return (
    <div className="videos-container">
      <div className="video-body">
        <h2>{props.video.title}</h2>
        <LikeDislike />
        <EmbedYoutube video={props.video} />
        <button
          className="btn btn-default"
          onClick={() => {
            handleDelete(props.video.id);
          }}
        >
          Delete Video
        </button>
      </div>
    </div>
  );
};

export default Video;
