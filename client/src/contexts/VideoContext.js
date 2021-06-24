import React, { createContext, useState } from "react";
import data from "../exampleresponse.json";

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videoList, setVideoList] = useState(data);
  const [searchText, setSearchText] = useState("");

  return (
    <VideoContext.Provider
      value={{ videoList, setVideoList, searchText, setSearchText }}
    >
      {children}
    </VideoContext.Provider>
  );
};
