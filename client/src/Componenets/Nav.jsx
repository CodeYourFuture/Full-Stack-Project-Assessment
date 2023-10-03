import React from "react";
import AddVideo from "./AddVideo";

const Nav = ({ update, setUpdate, videos, setVideos }) => {
  return (
    <nav>
      <AddVideo update={update} setUpdate={setUpdate} />
    </nav>
  );
};

export default Nav;
