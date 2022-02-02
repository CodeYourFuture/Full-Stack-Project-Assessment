import React, { useState } from "react";
import "./App.css";
import SuppliedData from "./exampleresponse.json";
import VideoList from "./VideoList";
import AddVideo from "./AddVideo";
import SearchVideo from "./SearchVideo";

function App() {
  const [VideosData, setVideosData] = useState(SuppliedData);
  const [searchVideos, setSearchVideos] = useState([]);
  console.log(VideosData);

  const addVideo = (title, url) => {
    let newVideo = {
      id: Math.floor(Math.random() * 1000000),
      title: title,
      url: url,
      rating: Math.floor(Math.random() * 10000),
    };

    let updatedList = VideosData.concat(newVideo);
    setVideosData(updatedList);
  };

  // PROP function of Search
  const search = (e) => {
    e.preventDefault();
    let searchQuery = e.target.value;
    console.log("searching:", searchQuery);

    const filteredResult = VideosData.filter((element) => {
      return element.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setSearchVideos(filteredResult);
  };

  // Prop Function to remove a video
  const removeVideo = (id) => {
    const dataCopy = [...VideosData];
    console.log(`removed video with id:${id}`);
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

        {searchVideos.length > 0 ? (
          <VideoList data={searchVideos} delete={removeVideo} />
        ) : (
          <VideoList data={VideosData} delete={removeVideo} />
        )}
      </div>
    </div>
  );
}

export default App;
