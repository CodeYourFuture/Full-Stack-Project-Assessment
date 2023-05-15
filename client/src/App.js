import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Video from "./components/Video";
import data from "./exampleresponse.json";
import AddVideo from "./components/AddVideo";

function App() {
  //to delete, update the videos
  const [listOfVideos, setListOfVideos] = useState(data);

  const handleDelete = async (videoId) => {
    setListOfVideos(listOfVideos.filter((video) => video.id !== videoId));
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
      id: listOfVideos.length + 1,
      title: title,
      url: link,
      rating: 0,
    };
    setListOfVideos(listOfVideos.concat(newVideo));
  }
  return (
    <div className="App">
      <Navbar />
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      <AddVideo addVideo={addVideo} />
      <div className="">
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
    </div>
  );
}

export default App;
