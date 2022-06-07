import React, { useState, useEffect } from "react";
import "./App.css";
import NewVideoForm from "./components/NewVideoForm";
import VideosContainer from "./components/VideosContainer";
import axios from "axios";
import DisplayHideButton from "./components/atoms/DisplayHideButton";
function App() {
  const [videos, setVideos] = useState([]);
  const [addVideoClicked, setAddVideoClicked] = useState(false);
  function loadVideos() {
    axios({
      method: "get",
      url: "/api",
    }).then((response) => {
      setVideos(response.data);
    });
  }

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div>
      <header>
        <h1>Video Recommendations</h1>
      </header>
      {addVideoClicked === false ? (
        <DisplayHideButton
          addVideoClicked={addVideoClicked}
          setAddVideoClicked={setAddVideoClicked}
          btnTitle="Add Video"
        />
      ) : (
        <>
          <NewVideoForm loadVideos={loadVideos} />{" "}
          <DisplayHideButton
            addVideoClicked={addVideoClicked}
            setAddVideoClicked={setAddVideoClicked}
            btnTitle="Hide form"
          />
        </>
      )}
      <VideosContainer videos={videos} loadVideos={loadVideos} />
    </div>
  );
}

export default App;
