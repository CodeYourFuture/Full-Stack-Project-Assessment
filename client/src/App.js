import "./App.css";
import React, { useEffect, useState } from "react";
import VideoList from "./components/VideoList";
import AddVideoForm from "./components/AddVideoForm";
import Searchbar from "./components/Searchbar";

// fetch from here: http://127.0.0.1:5000/

function App() {
  // An empty array [] to hold all the videos as our component loads them
  const [videos, setVideos] = useState([]);

  const [count, setCount] = useState(0);

  // backend
  const apiURL = "http://127.0.0.1:5000";

  const [formData, setFormData] = useState({
    title: "",
    url: "",
  });

  console.log("component rendered");

  // Empty dependecies array means the effect will only run on the very first render of component

  useEffect(
    function () {
      console.log("Run Effect");
      fetch(apiURL)
        .then((response) => {
          console.log("Got Response");
          return response.json();
        })
        .then((videoData) => {
          console.log("effect ran");
          setVideos(videoData);
        })
        .catch((error) => console.error(error));
    },
    [count]
  );

  // need to add some code to update database
  function changeVoteScore(id, voteChoice) {
    console.log("Vote Score Changed");
    fetch(`${apiURL}/videos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vote: voteChoice }),
    });
    // .catch((error) => console.error(error));
    setCount((prevCount) => prevCount + 1);
  }

  function deleteVideo(id) {
    fetch(`${apiURL}/videos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    // .catch((error) => console.error(error));
    setCount((prevCount) => prevCount + 1);
  }

  ///// ADD VIDEO
  function addVideo(formData) {
    console.log(formData);
    fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    setFormData({
      title: "",
      url: "",
    });
    setCount((prevCount) => prevCount + 1);
  }

  function searchVideo(searchInput) {
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        setVideos(
          data.filter((video) =>
            video.title.toLowerCase().includes(searchInput.toLowerCase())
          )
        );
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Videos</h1>
        <Searchbar handleSearchVideo={searchVideo} />
      </header>
      <div className="form--container">
        <AddVideoForm
          formData={formData}
          setFormData={setFormData}
          handleAddVideo={addVideo}
        />
      </div>
      <div className="video--container">
        <VideoList
          videos={videos}
          handleVote={changeVoteScore}
          handleDelete={deleteVideo}
        />
      </div>
    </div>
  );
}

export default App;
