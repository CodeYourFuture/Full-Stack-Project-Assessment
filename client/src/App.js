import "./App.css";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Video from "./components/Video";
//import data from "./exampleresponse.json";
import Form from "./components/Form";
import axios from "axios";

function App() {
  const [displayForm, setDisplayForm] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);
  const [addFormData, setAddFormData] = useState({
    title: "",
    url: "",
  });

  const getData = () => {
    axios.get("http://localhost:4000/").then((res) => {
      //console.log(res);
      setVideos(res.data);
    });
  };

  useEffect(() => {
    axios.get("http://localhost:4000/").then((res) => {
      //console.log(res);
      setVideos(res.data);
    });
  }, []);

  // function handleSearchInput(event) {
  //   setSearchTerm(event.target.value);
  // }

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

    axios.post(`http://localhost:4000/`, newVideo).then((res) => {
      if (res.status === 201) getData();
    });

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
    axios.delete(`http://localhost:4000/${videoId}`).then((res) => {
      if (res.status === 200) getData();
    });
    //const newVideos = [...videos];
    //const index = videos.findIndex((video) => video.id === videoId);
    //newVideos.splice(index, 1);
    //setVideos(newVideos);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="form-container">
        {/* <div className="search-wrapper">
          <label>
            Search
            <input
              value={searchTerm}
              onChange={handleSearchInput}
              name="search"
              type="text"
            />
          </label>
        </div> */}
        <div className="form-wrapper">
          <h2 onClick={() => setDisplayForm(true)}>Add Video</h2>

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
      </div>
      <div className="video-container">
        <div className="sub-container">
          <Video
            //searchTerm={searchTerm}
            videos={videos}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
