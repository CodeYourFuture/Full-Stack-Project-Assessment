import React from "react";
import VideoCard from "./VideoCard";

function VideoList(props) {
  return (
    <div className="video-list">
      {props.videos.map((video, index) => {
        return <VideoCard props={props.remove} key={index} video={video} />;
      })}
    </div>
  );
}

export default VideoList;
