import React, { useState, useEffect } from "react";
import "./App.css";
//import data from "./data.json";
import AddVideo from "./AddVideo";
import Search from "./Search";
import { FaThumbsUp, FaThumbsDown, FaTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function App(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/", {
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      });
  }, []);

  //______________________search____________________
  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  //______________________rating____________________
  function upVote(id) {
    const updatedVideos = videos.map((video) =>
      video.id === id ? { ...video, rating: video.rating + 1 } : video
    );
    setVideos(updatedVideos);
  }

  function downVote(id) {
    const updatedVideos = videos.map((video) =>
      video.id === id ? { ...video, rating: video.rating - 1 } : video
    );
    setVideos(updatedVideos);
  }

  //______________________add new video____________________
  const addNew = ({ id, title, url, rating }) => {
    setVideos((values) => [
      {
        id: values.length + 1,
        title,
        url,
        rating: 0,
      },
      ...values,
    ]);
  };

  //______________________delete video_______________________

  const deleteVideo = (id) => {
    let newDelete = videos.filter((video) => video.id !== id);
    setVideos(newDelete);
  };

function App() {
  return (
    <IconContext.Provider value={{ style: { fontSize: "35px" } }}>
      <div className="App">
        <header className="header-wrapper">
          <h1 className="header-title">Video Recommendation</h1>
        </header>

        <div className="content-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-5 ">
                <h3 className="search-title">{videos.length} videos saved</h3>
                <div className="col-md-12">
                  <Search searchTerm={searchTerm} handleSearch={handleSearch} />
                </div>
                <div className="col-md-12">

                  <AddVideo addNew={addNew} />
                </div>
              </div>

              <div className="col-md mt-3 ">
                {videos.length > 0 &&
                  videos
                    .sort((a, b) => b.rating - a.rating)
                    .filter(({ title }) =>
                      title.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((video) => {
                      const embedURL = video.url.split("v=")[1];

                      return (
                        <div className="card pt-4 mb-3 " key={video.id}>
                          <h3 className="video-title">{video.title}</h3>
                          <br />

                          <iframe
                            className="video-wrapper"
                            width=""
                            height="315px"
                            src={`https://www.youtube.com/embed/${embedURL}`}
                            title="YouTube video player"
                          ></iframe>
                          <div className="icon-panel-wrapper">
                            <div className="rating-wrapper">
                              <span onClick={() => upVote(video.id)}>
                                <FaThumbsUp className="rating-icon-up" />
                              </span>
                              <p className="rating-title">
                                Vote: {video.rating}
                              </p>
                              <button
                                disabled={videos.rating <= 0}
                                onClick={() => downVote(video.id)}
                              >
                                <FaThumbsDown className="rating-icon-down" />
                              </button>
                            </div>
                            <div onClick={() => deleteVideo(video.id)}>
                              <FaTrashAlt className="delete-icon" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default App;
