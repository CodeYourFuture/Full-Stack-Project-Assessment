import React, { useState } from "react";
// import "./App.css";
// import "./CSS/videocard.css";
import Homepage from "./components/Homepage";
import Video from "./components/Video";
import Response from "./exampleresponse.json";
import { nanoid } from "nanoid";

const myVideo = Response;

const App = () => {
  // const [videoState, setVideoState] = useState(myVideo);
  // const filteredVideo = (id) => videoState.filter((video) => video.id !== id);

  const [addVideo, setAddVideo] = useState(myVideo);
  const [addFormVideo, setAddFormVideo] = useState({
    title: "",
    url: "",
  });
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("title");
    const fieldValue = event.target.value;

    const newVideoData = { ...addFormVideo };
    newVideoData[fieldName] = fieldValue;
    setAddFormVideo(newVideoData);

    const newVideos = { ...addFormVideo };
    newVideos[fieldName] = fieldName;

    setAddFormVideo(newVideos);
  };
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newVideo = {
      id: nanoid(),
      title: addFormVideo.title,
      url: addFormVideo.url,
    };

    const newVideos = [...addVideo, newVideo];
    setAddVideo(newVideos);
  };
  // function addVideoObj() {
  //   const videoObj = { title: videoTitleInput, url: videoUrlInput };

  //   const videoObjValid = simpleValidator.current.allValid();
  //   if (videoObjValid) {
  //     props.createVideo(videoObj);
  //     setVideoTitleInput("");
  //     setVideoUrlInput("");
  //   } else {
  //     simpleValidator.current.showMessages();
  //     forceUpdate();
  //   }
  // }
  return (
    <div className="card">
      <div>
        <h2 className="add-video-bar">Add New Video : </h2>
        <form onSubmit={handleAddFormSubmit}>
          <input
            type="text"
            name="title"
            required="required"
            placeholder="Enter video Title ..."
            onChange={handleAddFormChange}
          />
          <input
            type="url"
            name="url"
            required="required"
            placeholder="Enter Video Url ..."
            onChange={handleAddFormChange}
          />
          <button type="submit" className="add-video-button">
            Add Video
          </button>
        </form>
      </div>

      <Homepage />
      <Video />
    </div>
  );
};

export default App;
