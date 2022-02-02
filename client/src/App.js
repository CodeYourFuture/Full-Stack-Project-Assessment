import "./App.css";
import React, { useState, useEffect } from "react";
import VideoList from "./VideoList";
import videos from "./exampleresponse.json";
import Add from "./Add";
import Search from "./Search";

// const API_ENDPOINT = "http://127.0.0.1/5000"

function App() {
  // set some state for the data, "add video" button and filtered list
  const [data, setData] = useState(videos);
  const [addBtn, setAddBtn] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [listType, setListType] = useState(true);


  useEffect((
    fetch()
  ),[])


  // a function to show or hide the form inputs
  const addToggle = () => {
    console.log(addBtn);
    setAddBtn(!addBtn);
  };

  // a function to handle the deletion of a video
  const deleteHandler = (e) => {
    const newState = data.filter((video) => {
      return video.id !== parseInt(e.target.id);
    });
    setData(newState);
    const newFilteredState = filteredList.filter((video) => {
      return video.id !== parseInt(e.target.id);
    });
    setFilteredList(newFilteredState);
  };

  // a function to handle the search input
  const searchHandler = (e) => {
    let videoData = data;
    const searchTerm = e.target.value;
    let filtered = videoData.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (e.target.value.length === 0) {
      setListType(true);
    } else {
      setListType(false);
      setFilteredList(filtered);
    }
  };

  // a function to get the form data and construct a 'video' object
  const handleForm = (e) => {
    e.preventDefault();
    let newVideo = {
      "id": Math.floor(Math.random() * 1000000),
      "title": e.target.title.value,
      "url": e.target.url.value,
      "rating": Math.floor(Math.random() * 10000),
    };
    let newState = data.concat(newVideo);
    // let newFilteredState = filteredList.concat(newVideo);
    setData(newState);
    // setFilteredList(newFilteredState);
  };

  return (
    <div className="App">
      {/* header */}
      <header className="title-container">
        <h1>Video Recommendation</h1>
      </header>
      
        <div className="add-search-container">
          <div className="add">
            <button className="add-button" onClick={addToggle}>
              Add Video
            </button>
            <div style={{ display: addBtn ? "flex" : "none" }}>
              <Add
                cancel={addToggle}
                handleForm={handleForm}
              />
            </div>
          </div>
          <div className="search">
            <Search searchHandler={searchHandler} />
          </div>
        </div>

        {listType === false ? (
          <VideoList delete={deleteHandler} data={filteredList} />
        ) : (
          <VideoList delete={deleteHandler} data={data} />
        )}

    </div>
  );
}

export default App;
