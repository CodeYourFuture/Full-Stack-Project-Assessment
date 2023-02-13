import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

import data from "../data/exampleresponse.json";



function VideoList() {
  const [videos, setVideos] = useState([""]);

  useEffect(() => {
    setVideos(data);
  }, []);

  return (
    <div>
      {videos.map((video) => (
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
