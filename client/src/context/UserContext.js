import { createContext } from "react";

const UserContext = createContext({
  videoData: [],
  setVideoData: () => {},
  deleteHandler: () => {},
  newVideo: false,
  setNewVideo: () => {},
  videoInfo: "",
  setVideoInfo: () => {},
  handleChange: () => {},
  addNewVideoHandler: () => {},
  searchHandler: () => {},
  searchString: "",
  setSearchString: () => {},
});

export default UserContext;
