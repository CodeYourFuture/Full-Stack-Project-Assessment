import React from "react";
import VideoCard from "./VideoCard";

export default function VideoList({ videodata, setVideoData }) {
//   console.log(videodata);

  function handleDeletedVideo(id) {
    const newVideoList = videodata.filter((eachVideo) => eachVideo.id !== id);
    setVideoData(newVideoList);
    // console.log(!newVideoList)
  }
  return (
    <div>
      {videodata.map((eachVideo, index) => (
        <VideoCard
          eachVideo={eachVideo}
          key={index}
          handleDeletedVideo={handleDeletedVideo}
        />
      ))}
    </div>
  );
}
