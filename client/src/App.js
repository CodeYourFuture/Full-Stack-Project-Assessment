import React, { useState, useEffect } from "react";
import AddVideoForm from "./AddVideoForm";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [order, setOrder] = useState("desc");
  const [selectedGenre, setSelectedGenre] = useState("");

  const fetchVideos = () => {
    let url = `http://localhost:5000/videos?order=${order}`;

    if (selectedGenre) {
      url += `&genre=${selectedGenre}`;
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
        <h1>The Pretty Coder</h1>
      </header>
      <h3> Navigating The Site:</h3>
      <p>
        Welcome to the Pretty coder video blog. Here you will find videos
        teaching you how to code as well as videos on fashion and beauty hacks.
        Because, pretty girl coders can also be fashionistas and beauty addicts
        too! Select preffered filters to watch videos by genre or most popular
        by rating. Happy Viewing!!
      </p>

      <div className="filterBtn">
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

        <div className="asc-descBtn">
          <p>View in ascending or descending order.</p>
          <h3>
            <button id="AscDescBtn" onClick={toggleOrder}>
              {order === "desc" ? "View Ascending" : "View Descending"}
            </button>
          </h3>
        </div>
      </div>

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
            <h4>Rating: {video.rating}</h4>
            <div className="vote-btns">
              <button id="vote-btn" onClick={() => voteUp(video.id)}>
                Vote Up
              </button>
              <button id="vote-btn" onClick={() => voteDown(video.id)}>
                Vote Down
              </button>
            </div>
            <div className="delete">
              <button id="delete-btn" onClick={() => deleteVideo(video.id)}>
                DELETE VIDEO
              </button>
            </div>
          </div>
        ))}
      </div>
      <AddVideoForm fetchVideos={fetchVideos} onAddVideo={addNewVideo} />
    </div>
  );
}

export default App;
