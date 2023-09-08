import React from "react";
import VideoItem from "./VideoItem";

const VideoSection = ({ videos, upVote, downVote, removeVideo }) => {
  return (
    <div>
      {videos.map((video) => (
        <VideoItem
          key={video.id}
          video={video}
          upVote={upVote}
          downVote={downVote}
          removeVideo={removeVideo}
        />
      ))}
    </div>
  );
};

export default VideoSection;