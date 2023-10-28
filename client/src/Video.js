import React from "react";
import CountVotes from "./CountVotes.js";

const Video = ({ video, onDeleteVideo }) => {
  let videoID = video.url.split("=")[1];
  const handleDelete = () => {
    onDeleteVideo(video.id);
  };
  return (
    <div className="video">
      <h3>{video.title}</h3>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoID}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <p> {video.votes}</p>
      <CountVotes />
      <button className="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Video;
