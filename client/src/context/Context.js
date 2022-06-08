import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";

const Context = ({ children }) => {
  const [videoData, setVideoData] = useState([]);
  const [newVideo, setNewVideo] = useState(false);
  const [videoInfo, setVideoInfo] = useState({
    link: "",
    name: "",
  });

  const handleChange = (key, value) => {
    setVideoInfo({ ...videoInfo, [key]: value });
  };

  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    setVideoInfo({ URL: "", name: "" });
  };

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
        videoInfo,
        setVideoInfo,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Context;
