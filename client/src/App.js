import "./App.css";
import React, { useState } from "react";

import UploadComponent from "./components/UploadComponent";
import Search from "./components/Search";
import Container from "./components/Container";
import Footer from "./components/Footer";

const App = () => {
  const [data, setData] = useState([]);
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addLocally = (newData) => {
    data.push(newData);
  };

  const searchForVideo = () => {
    const filteredVideos = data.filter((video) => {
      return video.title.toLowerCase().includes(searchQuery);
    });
    setVideos(filteredVideos);
    setSearchQuery("");
  };

  return (
    <>
      <header>
        <h1>Video recommendation</h1>
      </header>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchFunc={searchForVideo}
      />
      <UploadComponent addVideo={addLocally} />
      <Container setVideos={setVideos} videos={videos} setData={setData} />
      <Footer />
    </>
  );
};

export default App;
