import React, { useState, useEffect } from "react";
import AddVideoForm from "./AddVideoForm";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";



function App() {
  const [videos, setVideos] = useState([]);
  const [order, setOrder] = useState("desc");
  const [selectedGenre, setSelectedGenre] = useState("");
  // const [deleteVideos, setDeleteVideos]

  const fetchVideos = () => {
    let url = `https://pretty-coders-video-api.onrender.com/videos/`;

    if (selectedGenre) {
      url += `?genre=${selectedGenre}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.log("Your requested information is not currently available!");
        console.log(error);
      });
  };

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line
  }, [selectedGenre, order]);

  function addNewVideo(video) {
    const newVideosAdded = videos.concat(video);
    setVideos(newVideosAdded);
  }

  function voteUp(videoId) {
    const updatedVideos = videos.map((video) => {
      if (video.id === videoId) {
        return {
          ...video,
          rating: video.rating + 1,
        };
      }
      return video;
    });
    setVideos(updatedVideos);
  }

  function voteDown(videoId) {
    const updatedVideos = videos.map((video) => {
      if (video.id === videoId) {
        return {
          ...video,
          rating: video.rating - 1,
        };
      }
      return video;
    });
    setVideos(updatedVideos);
  }

  function deleteVideo(videoId) {
    const updatedVideos = videos.filter((video) => video.id !== videoId);
    setVideos(updatedVideos);
  }

  const sortedVideos = videos.concat().sort((a, b) => {
    if (order === "asc") {
      return a.rating - b.rating;
    } else {
      return b.rating - a.rating;
    }
  });

  const toggleOrder = () => {
    setOrder(order === "desc" ? "asc" : "desc");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>The Pretty Coders Blog</h1>
      </header>
      <div className="welcome">
        {/* Filter by genre */}
        <div className="genre-filter">
          <h3>Filter by Genre:</h3>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All</option>
            <option value="beauty">Beauty</option>
            <option value="coding">Coding</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>
        <div className="welcome-text">
          <h3> Hi,</h3>
          <p>
            Welcome to the Pretty coders video blog. <br></br>
            Created for software developers who love coding, programming,
            fashion and beauty! <br></br>
            Select and watch videos by genres
            or popularity. <br></br>Red-Heart up your favourite videos to help other
            viewers know which videos are a hit to watch.
            <br></br>
            Use the form below to add
            instructive/interesting videos to the platform. <br></br>
            Happy Viewing!!
          </p>
        </div>

        {/* filter by asc or desc */}
        <div className="asc-descBtn">
          <p>Filter by:</p>
          <h3>
            <button id="AscDescBtn" onClick={toggleOrder}>
              {order === "desc" ? "View Ascending" : "View Descending"}
            </button>
          </h3>
        </div>
      </div>

      <div className="filterBtn"></div>

      <div className="video-grid">
        {sortedVideos.map((video) => (
          <div className="newvideos" key={video.id}>
            <h4> {video.title}</h4>
            <iframe
              // width="400"
              // height="250"
              src={`https://www.youtube.com/embed/${video.url.slice(32)}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="vote-btns">
              <FontAwesomeIcon
                icon={faHeart}
                size="2x"
                color="red"
                onClick={() => voteUp(video.id)}
                className="vote-icon"
              />
              <h4>Rating: {video.rating}</h4>

              <FontAwesomeIcon
                icon={faHeartCrack}
                size="2x"
                onClick={() => voteDown(video.id)}
                className="vote-icon"
              />
            </div>
            <div className="delete">
              <FontAwesomeIcon
                icon={faTrashCan}
                size="1.9x"
                color="darkgreen"
                onClick={() => deleteVideo(video.id)}
                className="delete-btn"
              />
            </div>
          </div>
        ))}
      </div>
      <AddVideoForm fetchVideos={fetchVideos} onAddVideo={addNewVideo} />

      <div className="copyright">
        @copyright: Gayle Thompson-Igwebike. Code Your Future: London Class9!
      </div>
    </div>
  );
}

export default App;
