import React from "react";
import VideoContainer from "./VideoContainer";
import ExampleResponse from "../data/exampleresponse.json";
const AllVideoContainer = () => {
  return (
    <div>
      <VideoContainer ExampleResponse={ExampleResponse}/>
    </div>
  );
};

export default AllVideoContainer;
