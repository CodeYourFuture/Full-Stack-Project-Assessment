import React from "react";

import DeleteB from "./DeleteB";

import LikeAndDislike from "./LikeAndDislike";

import RenderVideo from "./RenderVideo";
import "bootstrap/dist/css/bootstrap.css";

function Video({ video, data, setData }) {
  return (
    <div>
      <div className="video-container  shadow p-3 mb-4 bg-white rounded rounded">
        <p className="mb-2">{video.title}</p>
        <RenderVideo video={video} />
        <div className="vote-container">
          <LikeAndDislike data={data} setData={setData} video={video} />
          <DeleteB data={data} setData={setData} video={video} />
        </div>
      </div>
    </div>
  );
}

export default Video;
