import "./App.css";
import React, { useEffect, useState } from "react";
import Video from "./components/Video";
import Form from "./components/Form";
import axios from "axios";

function App() {
  const [displayForm, setDisplayForm] = useState(false);
  const [videos, setVideos] = useState([]);
  const [addFormData, setAddFormData] = useState({
    title: "",
    url: "",
    rating: 0
  });

  const getData = () => {
    axios.get("http://localhost:4000/").then((res) => {
      setVideos(res.data);
    });
  };
  //getData()

  useEffect(() => {
    getData()
  }, []);

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
      title: addFormData.title,
      url: addFormData.url,
      rating: addFormData.rating
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
