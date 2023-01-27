import "./App.css";
import AddVideoButton from "./Buttons/AddVideoButton";
import Header from "./Components/Header";
// import data from "./exampleresponse.json";
import Video from "./Components/Video";
import React, { useState, useEffect } from "react";
import Footer from "./Components/Footer";

function App() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetch("http://localhost:5000/videos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => setVideos(data))
      .catch((error) => {
        console.log({ error: error.message });
      });

    setIsLoading(false);
  }, [videos]);
  function handleDelete(id) {
    let filterVideos = videos.filter((video) => video.id !== id);
    setVideos(filterVideos);
  }
  function addNewVideo(newVideo) {
    const allVideo = videos.concat(newVideo);
    setVideos(allVideo);
  }
  videos.sort((a, b) => {
    return b.rating - a.rating;
  });
  return isLoading ? (
    "A moment please"
  ) : (
    <div className="App">
      <Header />
      <AddVideoButton addNewVideoFunction={addNewVideo} />
      <div className="container-fluid">
        {videos.map((video, key) => (
          <Video video={video} key={key} handleDelete={handleDelete} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
