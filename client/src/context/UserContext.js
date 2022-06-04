import React, { createContext } from "react";

const UserContext = createContext({
  videoData: [],
  setVideoData: () => {},
});

export default UserContext;
