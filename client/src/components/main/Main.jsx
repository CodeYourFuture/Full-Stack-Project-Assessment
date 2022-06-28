import React from "react";
import Context from "../../context/Context";
import VideoCards from "../public/VideoCards";
import Search from "../public/Search";
import "../../styles/main.css";

const Main = () => {
  return (
    <div className="main">
      <Context>
        <Search />
        <VideoCards />
      </Context>
    </div>
  );
};

export default Main;
