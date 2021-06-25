import "./App.css";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayVideos from "./DisplayVideos";
//import videos from "./data/video.json";
import Search from "./Search";
import AddVideo from "./AddVideo";

function App() {
  const [videoList, SetVideoList] = useState([]);
  const [videosFiltered, setVideoFiltered] = useState([]);
  const [isAdded, setIsAdded] = useState(0);
  useEffect(() => {
     
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => {
        data.videos.sort((video1, video2) => video2.rating - video1.rating);
        SetVideoList(data.videos);
        setVideoFiltered(data.videos);
        console.log(videoList);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClickButton = (id) => {
    setVideoFiltered(videosFiltered.filter((video) => video.id !== id));
  };

  const search = (searchWord) => {
    console.log(searchWord);
    const result = videoList.filter((video) =>
      video.title.toLowerCase().includes(searchWord)
    );
    setVideoFiltered(result);
    console.log(result);
  };

  const addVideo = (titleValue, urlValue) => {
    const videoId = Math.floor(Math.random() * 10000000 + 1);
    const newVideo = {
      id: videoId,
      title: titleValue,
      url: `https://www.youtube.com/watch?v=${urlValue}`,
      rating: 1,
      timeSent: new Date(),
    };
    SetVideoList(videoList.concat(newVideo));
    setVideoFiltered(videosFiltered.concat(newVideo));
    setIsAdded(1);
    console.log(videoList);
  };
  return (
    <div className="App">
      <header className="App-header ">
        <h1>Video Recommendation</h1>
      </header>
      <div className="row ">
        <AddVideo addVideo={addVideo} isAdded={isAdded} />
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
