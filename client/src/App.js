import "./App.css";
import VideoCard from "./component/VideoCard";
import AddVideo from "./component/AddVideo";
import React from "react";
import { useState, useEffect } from "react";
import Data from "./exampleresponse.json";

function App() {
  const [videosList, setVideosList] = useState(Data);
  const [deletedVideoId, setDeletedVideoId] = useState(null);
  // const [newList, setNewList] = useState({});
  const [formData, setFormData] = useState({ title: "", url: "" });


  useEffect(function removeSelectedVideo() {
    // let targetedVideoIndex = videosList.findIndex((video) =>video.id == deletedVideoId);
    let filteredVideos = videosList.filter((video) => video.id != deletedVideoId);
    setVideosList(filteredVideos);
  }, [deletedVideoId]);

  function handleChange(event) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.title !== "" && formData.url.includes("www.youtube.com/watch?v=")){
      let newEntryId;
      let randomNum;
      const generateRandomNum=()=>randomNum = Math.floor(100000 + Math.random() * 900000);
      generateRandomNum();
      (videosList.includes(randomNum))?generateRandomNum():newEntryId=randomNum;
      const newRate = Math.floor(Math.random() * 9000);
      
      let newList={
        id: newEntryId,
        title: formData.title,
        url: formData.url,
        rating:newRate
      };
      setVideosList([...videosList,newList]);
    }else{
      alert(`Make sure you have a title and a valid Youtube link like: ("https://www.youtube.com/watch?v= ...")`);
    } 
  }


  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <h3>Do You Have Any Video Recommendation For Us!?</h3>
          <AddVideo formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </nav>
        <VideoCard videosList={videosList} setDeletedVideoId={setDeletedVideoId} />
      </header>
    </div>
  );
}

export default App;
