import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";

const Context = ({ children }) => {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const getVideosData = async () => {
      try {
        const response = await fetch("http://localhost:5000/videos", {
          method: "GET",
          credentials: "omit",
        });
        const myData = await response.json();
        setVideoData(myData);
      } catch (error) {
        console.log(error);
      }
    };

    getVideosData();
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ videoData, setVideoData, deleteHandler }}>
      {children}
    </UserContext.Provider>
  );
};

export default Context;
