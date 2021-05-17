import React, { useState } from "react";
import VideoDeleteButton from "./VideoDeleteButton";
import VideoFrame from "./VideoFrame";
import VideoTitle from "./VideoTitle";
import VideoVotingButtons from "./VideoVotingButtons";

const VideoContainer = ({
  videoId,
  videoTitle,
  videoRating,
  videoList,
  setVideoList,
}) => {
  const [rating, setRating] = useState(videoRating);
  return (
    <div>
      <VideoTitle videoTitle={videoTitle} />
      <VideoFrame videoId={videoId} videoTitle={videoTitle} />
      <VideoVotingButtons rating={rating} setRating={setRating} />
      <VideoDeleteButton
        videoTitle={videoTitle}
        videoList={videoList}
        setVideoList={setVideoList}
      />
    </div>
  );
};

export default VideoContainer;
