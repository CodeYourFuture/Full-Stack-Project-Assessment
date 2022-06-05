import React, { createContext } from "react";

const UserContext = createContext({
  videoData: [],
  setVideoData: () => {},
  deleteHandler: () => {},
});

export default UserContext;
