import React from "react";
import Video from "./Video";
import "./VideoList.css";
import Data from "./exampleresponse.json";

const VideoList = () => {
  return (
    <div className="VideoList">
      {Data.map((item) => (
        <Video
          key={item.id}
          id={item.id}
          title={item.title}
          url={item.url}
          rating={item.rating}
        />
      ))}
    </div>
  );
};

export default VideoList;
