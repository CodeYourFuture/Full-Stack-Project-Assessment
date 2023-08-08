import React from "react";

import Video from "./Video";

const Videos = ({ videos }) => {
  // Sorts the videos in descending of it's rating
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
