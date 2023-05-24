import React, { useState, useEffect } from "react";
// import exampleresponse from "./exampleresponse.json";
import AddVideoForm from "./AddVideoForm";
import "./App.css";



function App() {
  const [videos, setVideos] = useState([]);

  const fetchVideos =() => {
    fetch("http://localhost:5000/videos/")
      .then((response) => {
        console.log(response.status);
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setVideos(data);
      })
      .catch((error) => {
        console.log("Your requested infomation is not currently available!");
        console.log(error);
      });
  };
   useEffect(() => {
     fetchVideos();
   }, []);

  

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

  const sortedVideos = videos.concat().sort((b, a) => {
    if (a.rating > b.rating) {
      return 1;
    } else if (a.rating === b.rating) {
      return 0;
    } else if (a.rating < b.rating) {
      return -1;
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gayle's Video Recommendations</h1>
      </header>
      <div className="video-grid">
        {sortedVideos.map((video) => {
          return (
            <div className="newvideos" key={video.id}>
              <h4> Title: {video.title}</h4>

              <iframe
                width="400"
                height="250"
                src={`https://www.youtube.com/embed/${video.url.slice(32)}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <h4>Rating: {video.rating}</h4>
              <div className="vote-btns">
                <button id="vote-btn" onClick={() => voteUp(video.id)}>
                  Up Vote
                </button>
                <button id="vote-btn" onClick={() => voteDown(video.id)}>
                  Down Vote
                </button>
              </div>
              <div className="delete">
                <button id="delete-btn" onClick={() => deleteVideo(video.id)}>
                  DELETE VIDEO
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <AddVideoForm onAddVideo={addNewVideo} />
    </div>
  );
}

export default App;
