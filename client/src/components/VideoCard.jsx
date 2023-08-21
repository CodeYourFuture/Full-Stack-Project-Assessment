import React from "react";
import Button from "./Button";

const VideoCard = ({ videoData, setDeleteId }) => {

  function deleteHandler() {
    return setDeleteId(videoData.id);
  }
  return (
    <div>
      <p>{videoData.id}</p>
      <p>{videoData.title}</p>
      <iframe
        width="560"
        height="315"
        src={videoData.url.replace("watch?v=", "embed/")}
        title="YouTube video player"
        allowFullScreen
      ></iframe>
      <p>{videoData.rating}</p>
      <Button deleteHandler={deleteHandler}/>
    </div>
  );
};

export default VideoCard;


