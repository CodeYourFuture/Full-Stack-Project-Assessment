import React, { useState } from "react";

import Video from "./Video";

import data from "../data/exampleresponse.json";

const Videos = () => {
  const [videos, setVideos] = useState(data);

  const deleteVideo = (video) => {
    const copyOfVideos = [...videos];
    const index = copyOfVideos.indexOf(video);
    copyOfVideos.splice(index, 1);
    setVideos(copyOfVideos);
  };

  return (
    <div className="Videos">
      {videos.map((video) => {
        return <Video key={video.id} data={video} handleDelete={deleteVideo} />;
      })}
    </div>
  );
};

export default Videos;
