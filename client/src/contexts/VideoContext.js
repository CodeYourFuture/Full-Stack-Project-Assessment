import React, { createContext, useReducer } from "react";
import data from "../exampleresponse.json";

export const VideoContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, data: state.data.concat(action.payload) };
    case "DELETE":
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    case "SEARCH":
      return { ...state, searchText: action.payload };
    case "THUMBDOWN":
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload) {
            return { ...item, rating: item.rating - 1 };
          } else {
            return item;
          }
        }),
      };
    case "THUMBUP":
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload) {
            return { ...item, rating: item.rating + 1 };
          } else {
            return item;
          }
        }),
      };
    default:
      return state;
  }
}

export const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    data,
    searchText: "",
    sortStatus: "",
  });

  //const [videoList, setVideoList] = useState(data);
  //const [searchText, setSearchText] = useState("");

  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};
