import React, { useState } from "react";
import { v4 as uuid4 } from "uuid";

import Header from "./Components/Header";
import AddVideo from "./Components/AddVideo";
import Videos from "./Components/Videos";

import Context from "./Context/Context";

import data from "./data/exampleresponse.json";

import "./App.css";

const App = () => {
  const [videos, setVideos] = useState(data);
  const [urlError, setUrlError] = useState(false);

  const addVideo = (title, url) => {
    if (!url || !url.includes("youtube")) {
      setUrlError(true);
    } else {
      setUrlError(false);
      const copyOfVideos = [...videos];
      const fixedUrl = url.replace("watch?v=", "embed/");
      const newVideo = {
        id: uuid4(),
        title: title,
        url: fixedUrl,
        rating: 0,
      };
      copyOfVideos.push(newVideo);
      setVideos(copyOfVideos);
    }
  };

  const deleteVideo = (video) => {
    const copyOfVideos = [...videos];
    const index = copyOfVideos.indexOf(video);
    copyOfVideos.splice(index, 1);
    setVideos(copyOfVideos);
  };

  const vote = (video, voteType) => {
    const copyOfVideos = [...videos];
    const index = copyOfVideos.indexOf(video);
    copyOfVideos[index].rating =
      voteType === "up"
        ? copyOfVideos[index].rating + 1
        : copyOfVideos[index].rating - 1;
    setVideos(copyOfVideos);
  };

  return (
    <Context.Provider value={{ deleteVideo, vote }}>
      <div className="App">
        <Header />
        <AddVideo addVideo={addVideo} urlError={urlError} />
        <Videos videos={videos} handleDelete={deleteVideo} />
      </div>
    </Context.Provider>
  );
};

export default App;
