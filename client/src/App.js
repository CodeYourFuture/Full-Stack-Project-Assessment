import React, { useState } from "react";
import "./App.css";
import "./index.js";
import Jumbotron from "./Jumbotron";
import AddVideo from "./AddVideo";
import VideoCard from "./VideoCard";
import ExampleResponse from "./exampleresponse.json";
import Footer from "./Footer";

//Ordering the results
const OrderedData = ExampleResponse.sort((video1, video2) => video2.rating - video1.rating)

function App() {
  const [id, setId] = useState(0);
  const [allVideos, setAllVideos] = useState(OrderedData);

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
      date: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
    };

    //URL validation
    const isValidUrl = newVideo.url.match(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/);

    if (!isValidUrl) { 
      alert("PLease enter a valid YouTube URL");
    } else if (!newVideo.title) {
      alert("Please enter a title");
    } else{
      setId(id + 1);
      allVideos.push(newVideo);
    }
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
