import "./App.css";
import React, { useState, useEffect } from "react";
import AddVideoForm from "./AddVideoForm";
import moment from "moment";
import VideoComponent from "./VideoComponent";
import Footer from "./Footer";

const App = () => {
  const [videoList, setVideoList] = useState([]);
  const [sortedVideoList, setSortedVideoList] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/videos");
      if (res.ok) {
        const data = await res.json();
        setVideoList(data);
        const sortedList = [...data].sort((a, b) => b.rating - a.rating);
        setSortedVideoList(sortedList);
      } else {
        throw new Error("Failed to fetch videos");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };
 
  const addVideo = async (newVideo) => {
     const time = moment().format("YYYY-MM-DD HH:mm");
    try {
      
      const response = await fetch("http://localhost:5000/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      });
      if (!response.ok) {
        throw new Error("Failed to add video!");
      }
      const data = await response.json();
      
      const updatedVideoList = [
      ...videoList,
      { ...newVideo, id: data.id, rating: 0, time },
    ];
    setVideoList(updatedVideoList);
    setSortedVideoList(
      [...updatedVideoList].sort((a, b) => b.rating - a.rating));
      
    } catch (error) {
     console.log(error);
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="form-wrapper">
        <AddVideoForm AddVideo={addVideo} />
      

      <VideoComponent sortedVideoList={sortedVideoList} />
      <Footer />
      </div>
    </div>
  );
};

export default App;
