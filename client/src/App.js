import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.js";
import Jumbotron from "./Jumbotron";
import AddVideo from "./AddVideo";
import VideoCard from "./VideoCard";
import Footer from "./Footer";


function App() {
  const [allVideos, setAllVideos] = useState([]);
  const [refresh, setRefresh] = useState(0);

  //Ordering the results
  const orderedData = (array) =>
    array.sort((video1, video2) => video2.rating - video1.rating);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/", {
      method: "get",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw `${response.status} ${response.statusText}`;
      })
      .then((data) => {
        setAllVideos(orderedData(data));
      })
      .catch((error) => console.log(error));
  }, [refresh])
  

  const decreaseRating = (id) => {
    const updatedVideos = allVideos.map((video) => {
      return {
        ...video,
        rating:
          video.id === id ? (video.rating = video.rating - 1) : video.rating,
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
      fetch(`http://127.0.0.1:5001/${id}`, {
        method: "DELETE"
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw `${response.status} ${response.statusText}`;
        })
        .then((data) => {
          alert(data.msg)
          setRefresh(refresh + 1);
        })
        .catch((error) => console.log(error));
  };

  const addVideo = (title, url) => {
    fetch(`http://127.0.0.1:5001/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, url: url }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        alert(data.msg);
        setRefresh(refresh + 1);
      })
      .catch((error) => console.log(error));
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
