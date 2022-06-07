import React from "react";

import Video from "./Video";

const Videos = ({ videos }) => {
  return (
    <div className="Videos">
      {videos.map((video) => {
        return <Video key={video.id} data={video} />;
      })}
    </div>
  );
};

export default Videos;
