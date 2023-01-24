import React, { useState } from "react";
import Card from "./components/Card";
import videoData from "./exampleresponse.json";

const createCard = (data, searchTerm) => {
  let newUrl = data.url;
  let videoId = newUrl.split("=")[1];

  if (data.title.toLowerCase().includes(searchTerm.toLowerCase())) {
    return (
      <Card
        title={data.title}
        videoLink={videoId}
        rating={data.rating}
        // onDelete={onDelete}
      />
    );
  }
  return null;
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleYoutubeUrlChange = (event) => {
    setYoutubeUrl(event.target.value);
  };

  // const handleDelete = (index) => {
  //   setVideoData((prevData) => [
  //     ...prevData.slice(0, index),
  //     ...prevData.slice(index + 1),
  //   ]);
  // };

  return (
    <div className="container">
      <input type="text" onChange={handleSearch} placeholder="Search" />
      <br />
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
      />
      <br />
      <input
        type="text"
        value={youtubeUrl}
        onChange={handleYoutubeUrlChange}
        placeholder="Youtube URL"
      />
      <br />
      <button>Add</button>
      <div className="card-container">
        {videoData.map((data) => createCard(data, searchTerm))}
      </div>
    </div>
  );
};

export default App;
