import React, { useState } from "react";
import videosData from "./exampleresponse.json";
import VideoCard from "./VideoCard";

function Videos() {
  const [videos, setVideos] = useState(videosData);

  const handleDelete = (id) => {
    setVideos((prevVideosData) =>
      prevVideosData.filter((video) => video.id !== id)
    );
  };

  return (
    <div>
      <div className="video-container">
        {videos &&
          videos
            .sort((a, b) => b.rating - a.rating)
            .map((video) => {
              return <VideoCard video={video} handleDelete={handleDelete} />;
            })}
      </div>
    </div>
  );
}

export default Videos;
