import React from "react";
import SingleVideoCard from "./SingleVideoCard";

function VideoCards({ videos, setVideos }) {
  return (
    <div className="card-container">
      {videos.map((video) => (
        <SingleVideoCard
          key={video.id}
          videoId={video.id}
          filterVideos={videos}
          setFilterVideos={setVideos}
          title={video.title}
          url={video.url}
        />
      ))}
    </div>
  );
}
export default VideoCards;
