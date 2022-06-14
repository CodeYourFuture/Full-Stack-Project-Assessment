import React, { useState, useEffect } from "react";
import { v4 as uuid4 } from "uuid";

import Button from "@mui/material/Button";

import Header from "./Components/Header";
import AddVideo from "./Components/AddVideo";
import Videos from "./Components/Videos";
import DeleteModal from "./Components/DeleteModal";

import Context from "./Context/Context";

import "./App.css";

const App = () => {
  const [videos, setVideos] = useState([]); // The videos to be displayed
  const [hideForm, setHideForm] = useState(false); // Toggles the form to add video
  const [titleError, setTitleError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [modal, setModal] = useState(false);
  const [toDelete, setToDelete] = useState();

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((error) => console.log(error));
  }, []);

  // Adds a video
  const addVideo = (title, url) => {
    if (!title) {
      // If the title is not provided
      setTitleError(true);
    } else if (!url || !url.includes("youtube")) {
      // If the url is not provided or the url is not from youtube
      setTitleError(false);
      setUrlError(true);
    } else {
      // Resets the previous errors if any
      setTitleError(false);
      setUrlError(false);
      // const copyOfVideos = [...videos];
      const fixedUrl = url.replace("watch?v=", "embed/"); // Changes the url to fix the iframe error
      const newVideo = {
        id: uuid4(),
        title: title,
        url: fixedUrl,
        rating: 0,
        posted: new Date().toLocaleString(), // Gets the time when the video was posted
      };
      // copyOfVideos.push(newVideo);
      // setVideos(copyOfVideos);
      setVideos([...videos, newVideo]);
    }
  };

  // Modal
  const deleteConfirm = (id) => {
    setModal(true);
    setToDelete(id);
  };

  // Deletes a video
  const deleteVideo = (id) => {
    // const copyOfVideos = [...videos];
    // const video = copyOfVideos.find((video) => video.id === id);
    // const index = copyOfVideos.indexOf(video);
    // copyOfVideos.splice(index, 1);
    // setVideos(copyOfVideos);
    setVideos(videos.filter((video) => video.id !== id));
  };

  // Handles the video rating
  const vote = (id, voteType) => {
    const copyOfVideos = [...videos];
    const video = copyOfVideos.find((video) => video.id === id);
    const index = copyOfVideos.indexOf(video);
    // Checks if the video is liked or disliked
    copyOfVideos[index].rating =
      voteType === "up"
        ? copyOfVideos[index].rating + 1
        : copyOfVideos[index].rating - 1;
    setVideos(copyOfVideos);
  };

  return (
    <Context.Provider value={{ deleteConfirm, vote }}>
      <div className="App">
        <Header />
        {!hideForm ? (
          <Button
            sx={{
              mb: 5,
            }}
            variant="contained"
            onClick={() => setHideForm(true)}
          >
            Add Video
          </Button>
        ) : (
          <AddVideo
            addVideo={addVideo}
            titleError={titleError}
            urlError={urlError}
            hideForm={() => setHideForm()}
          />
        )}
        <Videos videos={videos} />
        {modal && (
          <DeleteModal
            id={toDelete}
            handleDelete={deleteVideo}
            closeModal={setModal}
          />
        )}
      </div>
    </Context.Provider>
  );
};

export default App;
