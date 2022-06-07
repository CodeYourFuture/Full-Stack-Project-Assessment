import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";

const Context = ({ children }) => {
  const [videoData, setVideoData] = useState([]);
  const [newVideo, setNewVideo] = useState(false);

  useEffect(() => {
    const getVideosData = async () => {
      try {
        const response = await fetch("http://localhost:5000/videos");
        const myData = await response.json();
        setVideoData(myData);
      } catch (error) {
        console.log(error);
      }
    };
    videoData.length === 0 && getVideosData();
  }, [setVideoData]);

  const deleteHandler = async (id) => {
    const deleteOpt = {
      method: "DELETE",
      body: "",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `http://localhost:5000/deletedvideo/${id}`,
        deleteOpt
      );
      const remainedData = await response.json();
      setVideoData(remainedData);
      console.log(remainedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        videoData,
        setVideoData,
        deleteHandler,
        newVideo,
        setNewVideo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Context;
