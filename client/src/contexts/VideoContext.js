import React, { createContext, useReducer, useEffect } from "react";
//import data from "../exampleresponse.json";
import axios from "axios";

export const VideoContext = createContext();
const apiUrl = "http://localhost:5000";

function reducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return { ...state, data: action.payload };
    case "ADD":
      return { ...state, data: state.data.concat(action.payload) };
    case "DELETE":
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    case "SEARCH":
      return { ...state, searchText: action.payload };
    case "SORTBY":
      return { ...state, sortStatus: action.payload };
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
    data: [],
    searchText: "",
    sortStatus: "",
  });

  useEffect(() => {
    axios(`${apiUrl}/`)
      .then((res) => dispatch({ type: "LOAD", payload: res.data }))
      .catch((err) => console.log("Error"));
  }, []);

  //const [videoList, setVideoList] = useState(data);
  //const [searchText, setSearchText] = useState("");

  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};
