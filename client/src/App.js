import "./App.css";
import DeleteVideo from "./component/DeleteVideo";
import Search from "./component/Search";
import VideoRatings from "./component/VideoRatings";
import Videos from "./component/Videos";
import VideoTitle from "./component/VideoTitle";
import React, { useState } from "react";

import data from "./data/exampleresponse.json";
import AddVid from "./component/AddVid";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [videos, setVideos] = useState(data);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [showVideoForm, setShowVideoForm] = useState(false);

  // Search functionality
  const filteredTitle = videos.filter((video) =>
    video.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Handle submit function when a new video is added
  const addNewVidSubmit = (e) => {
    e.preventDefault();
    let newVideo = { title, url, rating: 0 };
    setVideos(() => [...videos, newVideo]);
    setTitle({ title: "" });
    setUrl({ url: "" });
  };

  // On change function to handle new video title to add
  const handleVideoTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // On change function to handle new video url to add
  const handleVideoUrlChange = (event) => {
    setUrl(event.target.value);
  };

  // Delete function to handle deletion of video from page
  const handleDeleteVid = (videoId) => {
    const deleteVideo = videos.filter((video) => video.id !== videoId);
    setVideos(deleteVideo);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-white bg-primary">Video Recommendation</h1>
      </header>
      <AddVid
        handleVideoUrlChange={handleVideoUrlChange}
        handleVideoTitleChange={handleVideoTitleChange}
        addNewVidSubmit={addNewVidSubmit}
        showVideoForm={showVideoForm}
        setShowVideoForm={setShowVideoForm}
      />
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {filteredTitle.map((video) => (
        <div key={video.id} className="container mt-3">
          <VideoTitle title={video.title} searchValue={searchValue} />
          <VideoRatings rating={video.rating} />
          <Videos video={video.url} />
          <DeleteVideo id={video.id} handleDeleteVid={handleDeleteVid} />
        </div>
      ))}
    </div>
  );
}

export default App;
