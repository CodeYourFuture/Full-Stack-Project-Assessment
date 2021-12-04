import React from "react";
import VideoCard from "./VideoCard";

function AllVideoCards({ videos, setVideos }) {
  console.log(videos);
  const allVideos = videos.map((video) => (
    <VideoCard
      video={video}
      videos={videos}
      setVideos={setVideos}
      key={video.id}
    />
  ));
  return <div>{allVideos}</div>;
}

export default AllVideoCards;
