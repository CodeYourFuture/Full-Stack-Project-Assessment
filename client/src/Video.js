import React from "react";
import DeleteButton from "./buttons/DeleteButton";
import LikeIcon from "./buttons/LikeIcon";
import DislikeIcon from "./buttons/DislikeIcon";
import YouTubeEmbed from "./YouTubeEmbed";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";

function Video({ video, deleteVideo , value }) {
  const [vote, setVote] = useState(video.rating);
  const addVote = () => {
    setVote((vote) => {
      return vote + 1;
    });
  };
  const reduceVote = () => {
    setVote((vote) => {
      return vote - 1;
    });
  };
  return (
    <div className="video-container">
      <p>{video.title}</p>
      <div className="vote-container">
        <LikeIcon onClick={addVote} />
        <p>{vote > 0 ? `${vote}` : 0}</p>
        <DislikeIcon onClick={reduceVote} />
      </div>
      <YouTubeEmbed video={video} />
      <DeleteButton deleteVideo={deleteVideo} value={value} />
    </div>
  );
}

export default Video;
