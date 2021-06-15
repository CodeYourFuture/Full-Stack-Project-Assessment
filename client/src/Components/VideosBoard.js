import React, { useState } from "react";
import SingleVideo from "./SingleVideo";
// import data from "../exampleresponse.json";
const VideosBoard = ({ data }) => {
  const [videoData, setVideoData] = useState(data);
  return (
    <>
      {videoData.map((video) => {
        return (
          <SingleVideo
            video={video}
            videoData={videoData}
            setVideoData={setVideoData}
          />
        );
      })}
    </>
  );
};

export default VideosBoard;
