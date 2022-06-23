import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";

const Context = ({ children }) => {
  const [videoData, setVideoData] = useState([]);
  const [newVideo, setNewVideo] = useState(false);
  const [videoInfo, setVideoInfo] = useState({
    title: "",
    url: "",
    rating: "",
  });
  const [searchString, setSearchString] = useState("");

  const handleChange = (key, value) => {
    console.log(key, value);
    setVideoInfo({ ...videoInfo, [key]: value });
  };

  // const handleSubmit = (event) => {
  //   // prevents the submit button from refreshing the page
  //   event.preventDefault();
  //   setVideoInfo({ link: "", name: "" });
  // };

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
      const response = fetch(
        `http://localhost:5000/deletedvideo/${id}`,
        deleteOpt
      );
      // const remainedData = await response.json();
      setVideoData(response);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewVideoHandler = async () => {
    const newAddedVideo = videoInfo;
    const postOpt = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAddedVideo),
    };
    try {
      fetch("http://localhost:5000/api/addnewvideo", postOpt);
      // const newVideoData = await response.json();
      // console.log(newVideoData);
      // setVideoData(newVideoData);
      setNewVideo(false);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
      setVideoData([]);
    }
  };

  const searchHandler = async (searchWord) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/searchvideos?search=${searchWord}`
      );
      const searchData = await response.json();
      setVideoData(searchData);
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
        addNewVideoHandler,
        searchHandler,
        searchString,
        setSearchString,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Context;
