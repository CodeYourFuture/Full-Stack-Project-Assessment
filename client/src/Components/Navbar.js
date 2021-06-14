import React from "react";
import VideoLibraryRoundedIcon from "@material-ui/icons/VideoLibraryRounded";
const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="icon-wrapper">
        <VideoLibraryRoundedIcon fontSize="large" />
        <h3>I-watch</h3>
      </div>
      <div className="title">
        <h2>Keep the track of your videos</h2>
      </div>
    </div>
  );
};

export default Navbar;
