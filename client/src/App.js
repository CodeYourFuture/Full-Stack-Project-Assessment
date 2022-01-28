import React, { useState } from "react";
import "./App.css";
import "./index.js";
import Jumbotron from "./Jumbotron";
import AddVideo from "./AddVideo";
import VideoCard from "./VideoCard";
import ExampleResponse from "./exampleresponse.json";
import Footer from "./Footer";

function App() {
  const [id, setId] = useState(0);
  const [allVideos, setAllVideos] = useState(ExampleResponse);

  const decreaseRating = (id) => {
    const updatedVideos = allVideos.map((video) => {
      return {
        ...video,
        rating:
          video.id === id ? (video.rating = video.rating - 1) : video.rating
      };
    });
    setAllVideos(updatedVideos);
  };

  const increaseRating = (id) => {
    const updatedVideos = allVideos.map((video) => {
      return {
        ...video,
        rating:
          video.id === id ? (video.rating = video.rating + 1) : video.rating,
      };
    });
    setAllVideos(updatedVideos);
  };

  const deleteVideo = (id) => {
    const updatedVideos = allVideos.filter((video) => video.id !== id);
    setAllVideos(updatedVideos);
  };

  const addVideo = (title, url) => {
    const newVideo = {
      id: id,
      title: title,
      url: url,
      rating: 0,
    };
    setId(id + 1);
    allVideos.push(newVideo);
  };

  return (
    <div className="App">
      <Jumbotron />
      <AddVideo addVideo={addVideo} />
      <div className="VideoCardsContainer">
        {allVideos.map((video, index) => (
          <VideoCard
            key={index}
            video={video}
            addVote={increaseRating}
            removeVote={decreaseRating}
            deleteVideo={deleteVideo}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
