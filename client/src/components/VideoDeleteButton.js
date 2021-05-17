import React from "react";

const VideoDeleteButton = ({ videoTitle, videoList, setVideoList }) => {
  const handleDeleteVideo = (event) => {
    console.log(videoTitle);
    const newVideoList = videoList.filter(
      (video) => video.title !== videoTitle
    );
    console.log(newVideoList);
    setVideoList(newVideoList);
  };

  return (
    <div>
      <button onClick={handleDeleteVideo}>Delete</button>
    </div>
  );
};

export default VideoDeleteButton;
