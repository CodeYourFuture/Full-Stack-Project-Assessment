// import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";


function VideoList({videos}) {

  return (
    <div>
      {videos
        .sort((a, b) => b.rating - a.rating)
        .map((video) => (
          <>
            <VideoCard
              key={video.id}
              rating={video.rating}
              title={video.title}
              url={video.url}
            />
          </>
        ))}
    </div>
  );
}

export default VideoList;
