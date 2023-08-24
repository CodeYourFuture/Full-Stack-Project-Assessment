import "./App.css";
import React, { useEffect, useState } from "react";
import VideoList from "./components/VideoList";
import AddVideoForm from "./components/AddVideoForm";
import Searchbar from "./components/Searchbar";

// fetch from here: http://127.0.0.1:5000/

function App() {
  // An empty array [] to hold all the videos as our component loads them
  const [videos, setVideos] = useState([]);
  const apiURL = "http://127.0.0.1:5000";

  console.log("component rendered");

  // Empty dependecies array means the effect will only run on the very first render of component
  // No dependencies to watch to trigger this effect again
  useEffect(function () {
    fetch(apiURL)
      .then((response) => response.json())
      .then((videoData) => {
        console.log("effect ran");
        setVideos(videoData);
      });
  }, []);

  function changeVoteScore(id, voteChoice) {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id === id) {
          return {
            ...video,
            rating: video.rating + voteChoice,
          };
        }

        return video;
      })
    );
  }

  function deleteVideo(id) {
    fetch(`${apiURL}/videos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(
        setVideos((prevVideos) => {
          return prevVideos.filter((video) => video.id !== id);
        })
      )
      .catch((error) => console.error(error));
  }

  function addVideo(formData) {
    let maximumId = Math.max(...videos.map((video) => video.id));

    setVideos((prevVideos) => {
      return [
        {
          id: maximumId + 1,
          title: formData.title,
          url: formData.url,
          rating: 0,
        },
        ...prevVideos,
      ];
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendations</h1>
      </header>
      <div className="form--container">
        <AddVideoForm handleAddVideo={addVideo} />
        <Searchbar />
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
