import React from "react";
import VideoCard from "./VideoCard";

export default function VideoList(props) {
  const allVideoCards = props.videos.map((video) => {
    return (
      <div>
        <VideoCard
          key={video.id}
          title={video.title}
          url={video.url}
          voteCount={video.rating}
        />
      </div>
    );
  });

  return <>{allVideoCards}</>;
}
