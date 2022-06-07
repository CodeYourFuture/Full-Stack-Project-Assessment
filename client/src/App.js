import React, { useState } from "react";

import Header from "./Components/Header";
import Videos from "./Components/Videos";

import Context from "./Context/Context";

import data from "./data/exampleresponse.json";

import "./App.css";

const App = () => {
  const [videos, setVideos] = useState(data);

  const deleteVideo = (video) => {
    const copyOfVideos = [...videos];
    const index = copyOfVideos.indexOf(video);
    copyOfVideos.splice(index, 1);
    setVideos(copyOfVideos);
  };

  const vote = (video, type) => {
    const copyOfVideos = [...videos];
    const index = copyOfVideos.indexOf(video);
    copyOfVideos[index].rating =
      type === "up"
        ? copyOfVideos[index].rating + 1
        : copyOfVideos[index].rating - 1;
    setVideos(copyOfVideos);
  };

  return (
    <Context.Provider value={{ deleteVideo, vote }}>
      <div className="App">
        <Header />
        <Videos videos={videos} handleDelete={deleteVideo} />
      </div>
    </Context.Provider>
  );
};

export default App;
