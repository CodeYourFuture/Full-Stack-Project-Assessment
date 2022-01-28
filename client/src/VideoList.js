import React from "react";
import VideoCard from "./VideoCard";
import StartingVideos from './component/data/soulsongs.json'


function VideoList(props) {
  return (
    <div className="video-list">
      {StartingVideos.map((video, index) => {
        return <VideoCard key={index} video={video} />;
      })}
    </div>
  );
}

export default VideoList;
