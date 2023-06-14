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
        <h1>The Pretty Coder Blogger</h1>
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
          <h3> Hi:</h3>
          <p>
            Welcome to the Pretty coder video blog. <br></br>This site has been
            created by a software developer traineee with a love for coding/
            programming and a big fashion and beauty addict too! <br></br>
            Use the buttons below to select videos by genres.
            <br></br>
            Don't forget to vote up your favourite videos as this will help
            other viewers know which videos are a hit to watch.
            <br></br>
            And finally, you can also use the form below to add a new video that
            you found instructive and interesting to help other users. <br></br>
            So browse throuhgh and enjoy.Happy Viewing!!
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
