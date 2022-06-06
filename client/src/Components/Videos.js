import React, { useState } from "react";

import Video from "./Video";

import data from "../data/exampleresponse.json";

const Videos = () => {
  const [videos, setVideos] = useState(data);

  return (
    <div className="Videos">
      {videos.map((video) => {
        return <Video key={video.id} data={video} />;
      })}
    </div>
  );
};

export default Videos;
