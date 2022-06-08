import React from "react";
import Context from "../../context/Context";
import VideoCards from "../public/VideoCards";

const Main = () => {
  return (
    <Context>
      <VideoCards />
    </Context>
  );
};

export default Main;
