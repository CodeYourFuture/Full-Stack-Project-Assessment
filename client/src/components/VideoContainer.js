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

  const handleDeleteVideo = () => {
    const newVideoList = videoList.filter(
      (video) => video.title !== videoTitle
    );
    setVideoList(newVideoList);
  };

  return (
    <div>
      <VideoTitle videoTitle={videoTitle} />
      <VideoFrame videoId={videoId} videoTitle={videoTitle} />
      <VideoVotingButtons rating={rating} setRating={setRating} />
      <VideoDeleteButton handleDeleteVideo={handleDeleteVideo} />
    </div>
  );
};

export default VideoContainer;
