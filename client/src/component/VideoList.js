import React from "react";
import VideoCard from "./VideoCard";

export default function VideoList({ videodata, setVideoData }) {
  //   console.log(videodata);
  // console.log(!newVideoList)

  function handleDeletedVideo(id) {
    let deletedVideoId;

    fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    // console.log(id);
    deletedVideoId = id;

    const newVideoList = videodata.filter(
      (eachVideo) => eachVideo.id !== deletedVideoId
    );
    setVideoData(newVideoList);
  }

  return (
    <div className="videoList">
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
