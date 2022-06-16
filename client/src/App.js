import React, { useState, useEffect } from "react";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [loading]);

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
      setLoading(true);
      const fixedUrl = url.replace("watch?v=", "embed/"); // Changes the url to fix the iframe error
      const newVideo = {
        title: title,
        url: fixedUrl,
      };
      fetch("http://127.0.0.1:5000", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVideo),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(data && false);
        })
        .catch((error) => console.log(error));
    }
  };

  // Modal
  const deleteConfirm = (id) => {
    setModal(true);
    setToDelete(id);
  };

  // Deletes a video
  const deleteVideo = (id) => {
    setLoading(true);
    fetch(`http://127.0.0.1:5000/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setLoading(data && false))
      .catch((error) => console.log(error));
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
        {!loading && videos.length > 0 ? (
          <Videos videos={videos} />
        ) : (
          <p>Loading...</p>
        )}
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
