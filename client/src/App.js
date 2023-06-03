import React, { useState, useEffect } from "react";
import "./App.css";
import VideoList from "./VideoList";
import AddVideo from "./AddVideo";
import SearchVideo from "./SearchVideo";
function App() {
  const [videosData, setVideosData] = useState([]);
  const [searchVideos, setSearchVideos] = useState([]);
  console.log(videosData);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/videos")
      .then((res) => res.json())
      .then((data) => setVideosData(data));

    // setVideosData(data);
  }, []);

  function addVideo(title, url) {
    let newVideo = {
      id: Math.floor(Math.random() * 1000000),
      title: title,
      url: url,
      rating: Math.floor(Math.random() * 10000),
    };

    let updateList = videosData.concat(newVideo);
    setVideosData(updateList);
  }

  //Search Video function
  function search(e) {
    e.preventDefault();
    let searchQuery = e.target.value;
    console.log("searching:", searchQuery);

    const filteredResult = videosData.filter((element) => {
      return element.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setSearchVideos(filteredResult);
  }
  // Function delete videos
  const removeVideo = (id) => {
    const dataCopy = [...videosData];
    console.log(`remove video with id:${id}`);

    const index = dataCopy.findIndex((video) => {
      return video.id === id;
    });
    dataCopy.splice(index, 1);
    setVideosData(dataCopy);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="body-section">
        <SearchVideo search={search} />
        <AddVideo addVideo={addVideo} />

        <VideoList
          data={searchVideos.length > 0 ? searchVideos : videosData}
          delete={removeVideo}
        />
      </div>
    </div>
  );
}

export default App;
