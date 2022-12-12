import React, { useState } from "react";
import DeleteButton from "./buttons/DeleteButton";
import LikeIcon from "./buttons/LikeIcon";
import DislikeIcon from "./buttons/DislikeIcon";
import YouTubeEmbed from "./YouTubeEmbed";
import "bootstrap/dist/css/bootstrap.css";

function Video({ video }) {
  const [likes, setLikes] = useState(0);

  // ******** Create Dislike State for further Iterations ***********
  // const [dislikes, setDislikes] = useState(0);

  // ******** Create Handlers for my likes and dislikes / votes ***********

  const handleLikes = () => {
    setLikes(likes + 1);
  };

  const handleDislikes = () => {
    setLikes(likes - 1);
  };

  // **** Create function to Handle deleted Videos ********

  const deleteVideos = () => {
    return (
      console.log("This is selected video")
  )};

  // const handleDislikes = () => {
  //   setDislikes(dislikes - 1);
  // };

  // ******** Return and implement our handlers and state into buttons and Votes ***********

  return (
    <div className="video-container">
      <p>{video.title}</p>
      <div className="vote-container">
        <LikeIcon handleLikes={handleLikes} />
        <p>{likes}: Votes</p>
        <DislikeIcon handleDislikes={handleDislikes} />
      </div>
      <YouTubeEmbed video={video} />
      <DeleteButton deleteVideos={deleteVideos} />
    </div>
  );
}

export default Video;
