import React from "react";
import Context from "../../context/Context";
import VideoCards from "../public/VideoCards";
import Search from "../public/Search";

const Main = () => {
  return (
    <Context>
      <Search />
      <VideoCards />
    </Context>
  );
};

export default Main;
