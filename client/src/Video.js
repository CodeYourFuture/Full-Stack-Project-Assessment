import React from "react";

import BtnDelete from "./BtnDelete";
import VoteVideo from "./VoteVideo";
import RecommendBtn from "./RecommendBtn";


import "bootstrap/dist/css/bootstrap.css";

function Video({ video, data, setData }) {
  return (
    <div>
      <div className="video-container  shadow p-3 mb-4 bg-white rounded rounded">
        <p className="mb-2">{video.title}</p>
        <VoteVideo video={video} />
        <div className="vote-container">
          <RecommendBtn data={data} setData={setData} video={video} />
          <BtnDelete data={data} setData={setData} video={video} />
        </div>
      </div>
    </div>
  );
}

export default Video;