import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Video from "./components/Video";
import AddVideo from "./components/AddVideo";

function App() {
  //to delete, update the videos
  const [listOfVideos, setListOfVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((data) => {
        setListOfVideos(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [listOfVideos]);

  const handleDelete = async (videoId) => {
    try {
      await fetch(`http://localhost:5000/${videoId}`, {
        method: "DELETE",
      });
      setListOfVideos(listOfVideos.filter((video) => video.id !== videoId));
    } catch (e) {
      console.log("Error in handleDelete function" + e);
    }
  };

  //to update rating on the page
  const updateRating = async (videoId, newRating) => {
    setListOfVideos((prevList) =>
      prevList.map((video) =>
        video.id === videoId ? { ...video, rating: newRating } : video
      )
    );
  };

  //to add a new video to the page
  function addVideo(title, link) {
    const newVideo = {
      title: title,
      url: link,
    };

    fetch("http://localhost:5000/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then((data) => {
        setListOfVideos(listOfVideos.concat(data));
      })
      .catch((error) => console.log("AddVideo function error: " + error));
  }

  return (
    <div className="App">
      <Navbar />
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      <AddVideo addVideo={addVideo} />
      <div className="videos">
        {/* I use listOfVideos here to update the list of videos with new, and to delete them*/}
        {listOfVideos.map((video) => (
          <Video
            key={video.id}
            video={video}
            handleDelete={handleDelete}
            updateRating={updateRating}
          />
        ))}
      </div>
      <footer className="App-footer">
        Developed and designed by&nbsp;
        <a href="https://www.linkedin.com/in/nataliia-zablotska/">
          Natalie Zablotska
        </a>
      </footer>
    </div>
  );
}

export default App;
