import React from "react";
import VideoTitle from "./VideoTitle";

const Videos = ({ data }) => {
  return (
    <div>
      {data.map((vid, index) => (
        <VideoTitle video={vid} key={index} />
      ))}
    </div>
  );
};

export default Videos;
