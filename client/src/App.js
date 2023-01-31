import "./App.css";
import AddVideoButton from "./Buttons/AddVideoButton";
import Header from "./Components/Header";
import Video from "./Components/Video";
import React, { useState, useEffect } from "react";
import Footer from "./Components/Footer";

function App() {
  const [videos, setVideos] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
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
      .then((myData) => setVideos(myData))
      .catch((error) => {
        console.log({ error: error.message });
      });
  }, [refresh]);

  const addVideo = (newVideo) => {
    fetch(`http://localhost:5000/post-videos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newVideo.title, url: newVideo.url }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRefresh(refresh + 1);
      })
      .catch((error) => console.log(error));
  };

  const deleteVideo = (id) => {
    fetch(`http://localhost:5000/delete-videos/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setRefresh(refresh + 1);
        return res.json();
      })
      .then((myData) => setRefresh(refresh + 1))
      .catch((error) => {
        console.log({ error: error.message });
      });
  };

  videos.sort((a, b) => {
    return b.rating - a.rating;
  });

  return (
    <div className="App">
      <Header />
      <AddVideoButton addNewVideoFunction={addVideo} />
      <div className="container-fluid">
        {videos.map((video, key) => (
          <Video video={video} key={key} deleteVideo={deleteVideo} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
