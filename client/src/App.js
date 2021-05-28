import "./App.css";
import DeleteVideo from "./component/DeleteVideo";
import Search from "./component/Search";
import VideoRatings from "./component/VideoRatings";
import Videos from "./component/Videos";
import VideoTitle from "./component/VideoTitle";
import React, { useState, useEffect } from "react";
import AddVid from "./component/AddVid";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [showVideoForm, setShowVideoForm] = useState(false);

  // using `fetch` to retrieve data from the API.
  useEffect(() => {
    fetch(`http://localhost:5000`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(response.status);
          alert("Something went wrong!!!");
        }
        response.json();
      })
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.error("Error while fetching data", error);
      });
  }, []);

  // Search functionality
  const filteredTitle = videos.filter((video) =>
    video.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Handle submit function when a new video is added
  const addNewVidSubmit = (e) => {
    e.preventDefault();
    let newVideo = { title, url, rating: 0 };
    setVideos(() => [...videos, newVideo]);
    setTitle("");
    setUrl("");
  };

  // On change function to handle new video title to add
  const handleVideoTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // On change function to handle new video url to add
  const handleVideoUrlChange = (event) => {
    setUrl(event.target.value);
  };

  // Delete function to handle deletion of video from page
  const handleDeleteVid = (videoId) => {
    const deleteVideo = videos.filter((video) => video.id !== videoId);
    setVideos(deleteVideo);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-white bg-primary">Video Recommendation</h1>
      </header>
      <AddVid
        handleVideoUrlChange={handleVideoUrlChange}
        handleVideoTitleChange={handleVideoTitleChange}
        addNewVidSubmit={addNewVidSubmit}
        showVideoForm={showVideoForm}
        setShowVideoForm={setShowVideoForm}
      />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="main-container">
        {filteredTitle.map((video) => (
          <div key={video.id} className="container">
            <VideoTitle title={video.title} searchValue={searchValue} />
            <VideoRatings rating={video.rating} />
            <Videos video={video.url} />
            <DeleteVideo id={video.id} handleDeleteVid={handleDeleteVid} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
