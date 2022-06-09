import "./App.css";
import React, { useState, useEffect } from "react";
import VideoList from "./VideoList";
import Add from "./Add";
import Search from "./Search";

function App() {
  // set some state for the data, "add video" button and filtered list
  const [data, setData] = useState([]);
  const [addBtn, setAddBtn] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [listType, setListType] = useState(true);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw `${response.status} ${response.statusText}`;
      })
      .then(function (videos) {
        setData(videos);
      })
      .catch(function (error) {
        console.log("An error occurred:", error);
      });
  }, [update]);

  // a function to show or hide the form inputs
  const addToggle = () => {
    setAddBtn(!addBtn);
  };

  // a function to handle the deletion of a video
  const deleteHandler = (e) => {
    fetch(`http://localhost:5000/${e.target.id}`, {
      method: "delete",
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw `${response.status} ${response.statusText}`;
      })
      .then(() => {
        setUpdate(!update);
      })
      .catch(function (error) {
        console.log("An error occurred:", error);
      });

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

  // a function to get the form data and construct a 'video' card
  const handleForm = (e) => {
    // e.preventDefault();
    fetch("http://localhost:5000/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "title": e.target.title.value,
        "url": e.target.url.value,
        "rating": Math.floor(Math.random() * 10000),
        "votes": 0,
      }),
    })
      .then((response) => console.log(response))
      .then(() => {
        setUpdate(!update);
      })
      .catch(function (error) {
        console.log("An error occurred:", error);
      });
  };

  return (
    <div className="App">
      {/* header */}
      <header className="title-container">
        <h1>Video Recommendation</h1>
      </header>

      <div className="add-search-container">
        <div className="add">
          <div className="add-button-container">
            <button className="add-button" onClick={addToggle}>
              {addBtn===false ? "Add Button" : "Close"}
            </button>
          </div>
          <div style={{ display: addBtn ? "flex" : "none" }}>
            <Add cancel={addToggle} handleForm={handleForm} />
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
