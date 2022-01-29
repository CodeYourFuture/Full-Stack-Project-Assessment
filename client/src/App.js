import "./App.css";
import React, { useState } from "react";
import VideoList from "./VideoList";
import videos from "./exampleresponse.json";
import Add from "./Add";
import Search from "./Search";

function App() {
  // set some state for the data, "add video" button and filtered list
  const [data, setData] = useState(videos);
  const [addBtn, setAddBtn] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [listType, setListType] = useState(true);

  // a function to show or hide the form inputs
  const addToggle = () => {
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
      <header className="title-container">
        <h1>Video Recommendation</h1>
      </header>

      <div className="form-search-container">
        <div className="add">
          <button className="add-button" onClick={addToggle}>
            Add Video
          </button>
          {addBtn ? <Add cancel={addToggle} handleForm={handleForm} /> : null}
        </div>
        <div className="search">
          <Search searchHandler={searchHandler} />
        </div>
      </div>

      {listType === false > 0 ? (
        <VideoList delete={deleteHandler} data={filteredList} />
      ) : (
        <VideoList delete={deleteHandler} data={data} />
      )}
      <div>
        {" "}
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/gregor-cresnar"
          title="Gregor Cresnar"
        >
          {" "}
          Gregor Cresnar{" "}
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          {" "}
          www.flaticon.com'{" "}
        </a>
      </div>
    </div>
  );
}

export default App;
