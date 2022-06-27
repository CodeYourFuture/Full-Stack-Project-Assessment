import React, { useState, useEffect } from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import Video from "./components/Video";
import Response from "./exampleresponse.json";

const myVideo = Response;

const App = () => {
  // const [videoState, setVideoState] = useState(myVideo);
  // const filteredVideo = (id) => videoState.filter((video) => video.id !== id);

  const AddVideo = () => {
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

      return (
        <div className="App.1">
          <div>
            <h2 className="add-video-bar">Add New Video : </h2>
            <form>
              <input
                type="text"
                name="title"
                required="required"
                placeholder="Enter video Title ..."
                onChange={handleAddFormChange}
              />
              <input
                type="text"
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
  };
};
export default App;
