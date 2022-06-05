import React, { createContext } from "react";

const UserContext = createContext({
  videoData: [],
  setVideoData: () => {},
  deleteHandler: () => {},
  newVideo: false,
  setNewVideo: () => {},
});

export default UserContext;
