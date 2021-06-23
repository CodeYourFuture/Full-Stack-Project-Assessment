import "./App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayVideos from "./DisplayVideos";
import videos from "./data/video.json";
import Search from "./Search";
import AddVideo from "./AddVideo";

function App() {
  const [videoList, SetVideoList] = useState([]);
  console.log(videoList);
fetch("http://localhost:5000")
  .then((res) => res.json())
  .then((data) => SetVideoList(data))
  .catch((err) => console.error(err));
  const [videosFiltered, setVideoFiltered] = useState(videos);
  const handleClickButton = (id) => {
    setVideoFiltered(videosFiltered.filter((video) => video.id !== id));
  };
  const search = (searchWord) => {
    const result = videoList.filter((video) =>
      video.title.toLowerCase().includes(searchWord)
    );
    setVideoFiltered(result);
  };
  const addVideo = (titleValue, urlValue) => {
    const videoId = Math.floor(Math.random() * 10000000 + 1);
    const newVideo = {
      id: videoId,
      title: titleValue,
      url: `https://www.youtube.com/watch?v=${urlValue}`,
      rating: 1,
    };
    SetVideoList(videoList.concat(newVideo));
    setVideoFiltered(videosFiltered.concat(newVideo));
    console.log(videoList);
  };
  return (
    <div className="App">
      <header className="App-header ">
        <h1>Video Recommendation</h1>
      </header>
      <div className="row ">
        <AddVideo addVideo={addVideo} />
        <Search search={search} />
      </div>
      <div className="container">
        <div className="row">
          {videosFiltered.map((video, index) => (
            <DisplayVideos
              video={video}
              handleClickButton={handleClickButton}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
