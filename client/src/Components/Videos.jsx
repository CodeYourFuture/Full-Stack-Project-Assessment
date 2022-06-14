import React from "react";

import Video from "./Video";

const Videos = ({ unorderedVideos }) => {
  // Sorts the videos in descending of it's rating
  const videos = [...unorderedVideos];
  videos.sort((a, b) => b.rating - a.rating);

  return (
    <div className="Videos">
      {videos.map((video) => {
        return (
          <Video
            key={video.id}
            id={video.id}
            title={video.title}
            url={video.url}
            rating={video.rating}
            posted={video.posted}
          />
        );
      })}
    </div>
  );
};

export default Videos;
