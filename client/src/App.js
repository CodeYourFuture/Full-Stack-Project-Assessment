import "./App.css";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import Video from "./components/Video";
import data from "./exampleresponse.json";

function App() {
  const [videos, setVideos] = useState(data);
  const [addFormData, setAddFormData] = useState({
    title: "",
    url: "",
  });

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

    const newVideos = [...videos, newVideo];
    console.log(newVideos);
    setVideos(newVideos);
  };

  const handleDeleteClick = (videoId) => {
    const newVideos = [...videos];

    const index = videos.findIndex((video) => video.id === videoId);

    newVideos.splice(index, 1);
    setVideos(newVideos);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>

        <div className="form-container">
          <h2>Add Video</h2>
          <form onSubmit={handleAddFormSubmit}>
            <label>
              Title
              <input
                type="text"
                name="title"
                placeholder="Enter title..."
                onChange={handleAddFormChange}
                required
              />
            </label>

            <label>
              Url
              <input
                type="url"
                name="url"
                placeholder="Enter url..."
                onChange={handleAddFormChange}
                required
              />
            </label>
            <button type="submit">Add</button>
          </form>
        </div>
        <div className="container">
          <Video videos={videos} handleDeleteClick={handleDeleteClick} />
        </div>
      </header>
    </div>
  );
}

export default App;
