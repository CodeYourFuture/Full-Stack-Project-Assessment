import React, { useState } from "react";
import SingleVideo from "./SingleVideo";
// import data from "../exampleresponse.json";
const VideosBoard = ({ videoData,setVideoData }) => {
  // const [videoData, setVideoData] = useState(data);
  return (
    <>
      <div className="d-flex flex-wrap justify-content-center">
        {videoData.map((video) => {
          return (
            <SingleVideo
              video={video}
              videoData={videoData}
              setVideoData={setVideoData}
            />
          );
        })}
      </div>
    </>
  );
};

export default VideosBoard;
