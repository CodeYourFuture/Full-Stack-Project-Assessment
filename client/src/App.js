import "./App.css";
import VideoCard from "./component/VideoCard";
import AddVideo from "./component/AddVideo";
import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [videosList, setVideosList] = useState([]);
  const [deletedVideoId, setDeletedVideoId] = useState(null);

  const [formData, setFormData] = useState({ title: "", url: "" });

  const getData = () => {
    useEffect(() => {
      fetch(`http://localhost:5000/videos`)
        .then(res => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then(data => {
          console.log(data);
          setVideosList(data);
        })
        .catch(err => console.log(err));
    },[]);
  }
  getData();

  const removeSelectedVideo = () => {
  
    useEffect( ()=>{
      console.log(deletedVideoId);
      fetch(`http://localhost:5000/videos/${deletedVideoId}`, { method: 'DELETE' })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
      .then(data=>{
        setVideosList(data);
      })
      .catch(err => console.log(err));

    }, [deletedVideoId]);
  };
    removeSelectedVideo();

    function handleChange(event) {
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [event.target.name]: event.target.value
        };
      });
    };
  

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.title !== "" && formData.url.includes("www.youtube.com/watch?v=")) {
      let newEntryId;
      let randomNum;
      const generateRandomNum = () => randomNum = Math.floor(100000 + Math.random() * 900000);
      generateRandomNum();
      (videosList.includes(randomNum)) ? generateRandomNum() : newEntryId = randomNum;
      // const newRate = Math.floor(Math.random() * 9000);
      let date = new Date().toJSON();

      let newList = {
        id: newEntryId,
        title: formData.title,
        url: formData.url,
        rating:"",
        submissionDate: date
      };

      console.log(newList);
      setVideosList([...videosList, newList]);
    } else {
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
        {videosList ? <VideoCard videosList={videosList} setDeletedVideoId={setDeletedVideoId} /> : <div>Loading...</div>}
      </header>
    </div>
  );
}

export default App;