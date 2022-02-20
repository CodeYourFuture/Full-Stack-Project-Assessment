import React from "react";
import VideoCard from "./VideoCard";

const AllVideos = ({ videos, setVideos }) => {
  const allVideos = videos.map((video, index) => (
    <VideoCard
      key={video.id}
      videos={videos}
      setVideos={setVideos}
      video={video}
      index={index}
    />
  ));
  return (
    <div className="d-flex flex-wrap justify-content-around flex-row">
      {allVideos}
    </div>
  );
};

export default AllVideos;
