import "./App.css";
import AddVideoButton from "./Buttons/AddVideoButton";
import Header from "./Components/Header";
import data from "./exampleresponse.json";
import Video from "./Components/Video";
import React, { useState } from "react";
import Footer from "./Components/Footer";
// import SearchBar from "./Buttons/SearchBar"

function App() {
  const [videos, setVideos] = useState(data);
  function handleDelete(id) {
    let filterVideos = videos.filter((video) => video.id !== id);
    setVideos(filterVideos);
  }
  function addNewVideo(newVideo) {
    const allVideo = videos.concat(newVideo);
    setVideos(allVideo);
  }
  return (
    <div className="App">
      <Header />
      <AddVideoButton addNewVideoFunction={addNewVideo} />
      {/* <SearchBar /> */}
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
