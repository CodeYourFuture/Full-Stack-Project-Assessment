import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";

const Context = ({ children }) => {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const getVideosData = async () => {
      try {
        const response = await fetch("http://localhost:5000/videos");
        const myData = await response.json();
        setVideoData(myData);
        console.log("done");
      } catch (error) {
        console.log(error);
      }
    };
    // videoData.length === 0 && getVideosData();
    getVideosData();
  }, [setVideoData]);

  return (
    <UserContext.Provider value={{ videoData, setVideoData }}>
      {children}
    </UserContext.Provider>
  );
};

export default Context;
