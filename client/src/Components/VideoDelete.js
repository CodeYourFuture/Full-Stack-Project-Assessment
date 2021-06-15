import { Button } from "@material-ui/core";
import React from "react";

const VideoDelete = ({ video, videoData, setVideoData }) => {
  function handleDelete(id) {
    const filteredData = videoData.filter((da) => {
      return da.id !== id;
    });
    console.log(filteredData);
    setVideoData(filteredData);
  }
  return (
    <div>
      <Button onClick={() => handleDelete(video.id)}>Delete</Button>
    </div>
  );
};

export default VideoDelete;
