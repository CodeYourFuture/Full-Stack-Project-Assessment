import React, { createContext } from "react";

const UserContext = createContext({
  videoData: [],
  setVideoData: () => {},
  deleteHandler: () => {},
  newVideo: false,
  setNewVideo: () => {},
  vote: 0,
  setVote: () => {},
});

export default UserContext;
