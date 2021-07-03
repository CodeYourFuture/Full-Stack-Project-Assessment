import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Adding from "./components/Adding";
import Search from "./components/Search";
import Video from "./components/Video";

function App() {
  const URL = "http://localhost:5000/";
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setVideoList(data))
      .catch((err) => console.error(err));
  }, []);

  // let sortedVideoList = videoList.sort(function (a, b) {
  //   return a.rating - b.rating;
  // });

  function addVideo(newVideo) {
    setVideoList(videoList.concat(newVideo));
  }

  // I had some help with this setOrder function
  function setOrder(isDescending) {
    const order = isDescending ? "desc" : "asc";
    fetch(URL + `?order=${order}`)
      .then((res) => res.json())
      .then((data) => setVideoList(data))
      .catch((err) => console.error(err));
  }

  return (
    <div className="App">
      <Header />
      <div>
        <Adding addVideo={addVideo} />
        <Search callback={setOrder} />
      </div>
      {
        <div>
          {!videoList ? (
            "Loading..."
          ) : (
            <div className="videoGrid">
              {videoList.map(function (video, index) {
                return (
                  <Video
                    key={index}
                    title={video.title}
                    url={video.url}
                    timestamp={video.timestamp}
                  />
                );
              })}
            </div>
          )}
        </div>
      }
      <Footer />
    </div>
  );
}

export default App;
