import "./App.css";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import Video from "./components/Video";
import data from "./exampleresponse.json";
import Form from "./components/Form";

function App() {
  const [displayForm, setDisplayForm] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [videos, setVideos] = useState(data);
  const [addFormData, setAddFormData] = useState({
    title: "",
    url: "",
  });

  // const isVideoSearch = videos.map((video) => {
  //   return video.title.includes(searchInput);
  // });

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newVideo = {
      id: nanoid(),
      title: addFormData.title,
      url: addFormData.url,
    };

    const validateUrl = (url) => {
      const urlType =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (url.match(urlType)) {
        return url.match(urlType)[1];
      }
      return false;
    };

    if (validateUrl(newVideo.url)) {
      const newVideos = [...videos, newVideo];
      //console.log(newVideos);
      setVideos(newVideos);
    } else {
      alert("invalid Youtube url");
    }
  };

  const handleDeleteClick = (videoId) => {
    const newVideos = [...videos];

    const index = videos.findIndex((video) => video.id === videoId);

    newVideos.splice(index, 1);
    setVideos(newVideos);
  };

  function handleSearchInput(event) {
    setSearchInput(event.target.value);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="form-container">
        <div>
          <h4
            onClick={() => setDisplayForm(true)}
            style={{ color: "rgb(53, 102, 251)", padding: "10px" }}
          >
            Add Video
          </h4>
          {displayForm ? (
            <Form
              handleAddFormSubmit={handleAddFormSubmit}
              handleAddFormChange={handleAddFormChange}
              setDisplayForm={setDisplayForm}
            />
          ) : (
            ""
          )}
        </div>

        <div className="search-wrapper">
          <label>
            Search
            <input
              value={searchInput}
              onChange={handleSearchInput}
              name="search"
              type="text"
            />
          </label>
        </div>
      </div>

      <div className="form-container">
        <Video videos={videos} handleDeleteClick={handleDeleteClick} />
      </div>
    </div>
  );
}

export default App;
