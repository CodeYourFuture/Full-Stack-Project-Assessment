import React from "react";
import Videolink from "./oneVideo";
import data from "./exampleresponse.json";

const Video = (props) => {
  return (
    <div>
      {data.map((video, index) => (
        <Videolink video={video} key={index} />
      ))}
      ;
    </div>
  );
};

export default Video;
