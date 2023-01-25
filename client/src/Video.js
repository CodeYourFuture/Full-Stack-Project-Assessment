import React, { useState } from "react";
import EmbedVideo from "./EmbedVideo";
import DeleteButton from "./buttons/DeleteButton";
import LikeButton from "./buttons/LikeButton";
import DislikeButton from "./buttons/DisLikeButton";

function Video({ video, remove}) {
  const [count, setCount] = useState(video.rating);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  return (
    <div className="video-container" id={video.id}>
      <p>{video.title}</p>
      <div className="vote-container">
        <LikeButton increment={increment} />
        <p>{count}</p>
        <DislikeButton decrement={decrement} />
      </div>
      <EmbedVideo video={video} />
      <DeleteButton remove={remove} id={video.id}/>
    </div>
  );
}
export default Video;
