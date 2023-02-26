// import React, { useEffect, useState } from "react";

import VideoCard from "./VideoCard";

function VideoList({ handleDeleteVideo, videos }) {

  return (
    <div>
      {videos
        .sort((a, b) => b.rating - a.rating)
        .map((video) => (
          <>
            <VideoCard
              handleDeleteVideo={handleDeleteVideo}
              id={video.v_id}
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
