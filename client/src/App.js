import React, { useState, useEffect } from "react";
import "./App.css";
import AddVideo from "./AddVideo";
import Search from "./Search";
import { FaThumbsUp, FaThumbsDown, FaTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function App(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5432/", {
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
    fetch("http://localhost:5432/videos/", {
      method: "post",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, url: url }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setVideos([
          ...videos,
          {
            id: data.id,
            title: data.title,
            url: data.url,
            rating: 0,
          },
        ]);
      });
  };

  //______________________delete video_______________________

  const deleteVideo = (id) => {
    fetch(`http://localhost:5432/videos/${id}`, {
      method: "delete",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.status === 200) {
        let updatedVideos = videos.filter((video) => video.id !== id);
        setVideos(updatedVideos);
      }
    });
  };

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
                                className="btn"
                                disabled={video.rating <= 0}
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
