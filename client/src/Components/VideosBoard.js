import React from "react";
import SingleVideo from "./SingleVideo";
import data from "../exampleresponse.json";
const VideosBoard = () => {
  console.log(data);
  return (
    <>
      {data.map((video) => {
        return <SingleVideo video={video}/>
      })}
    </>
  );
};

export default VideosBoard;
