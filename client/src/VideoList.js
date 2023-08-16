import React from "react";
import VideoCard from "./VideoCard";

export default function VideoList(props) {
  const allVideoCards = props.videos.map((video) => {
    return (
      <VideoCard
        key={video.id}
        title={video.title}
        url={video.url}
        rating={video.rating}
      />
    );
  });

  return <>{allVideoCards}</>;
}
