import React, { useState } from "react";
import SingleVideo from "./SingleVideo";
// import data from "../exampleresponse.json";
const VideosBoard = ({
  videoData,
  setVideoData,
  setIsDataUpdating,
  isDataUpdating,
}) => {
  // const [videoData, setVideoData] = useState(data);
  // const sortVideoData=[...videoData]
  let sortVideoData = [];
  if (videoData) {
    sortVideoData = videoData.map((a) => ({ ...a }));
    sortVideoData.sort((video, nextVideo) => {
      return nextVideo["like"] - video["like"];
    });
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center">
        {videoData &&
          sortVideoData.map((video) => {
            return (
              <SingleVideo
                video={video}
                videoData={videoData}
                setVideoData={setVideoData}
                setIsDataUpdating={setIsDataUpdating}
                isDataUpdating={isDataUpdating}
                key={video.id}
              />
            );
          })}
      </div>
    </>
  );
};

export default VideosBoard;
