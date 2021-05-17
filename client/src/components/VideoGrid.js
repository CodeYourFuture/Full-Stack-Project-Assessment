import React from "react";
import VideoContainer from "./VideoContainer";

const VideoGrid = ({ videoList }) => {
  console.log("type of videoList is : " + typeof videoList);
  console.log(videoList);

  return (
    <div>
      {videoList.map((video) => (
        <VideoContainer
          key={video.title}
          videoId={video.url.split("=")[1]}
          videoTitle={video.title}
          videoRating={video.rating}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
