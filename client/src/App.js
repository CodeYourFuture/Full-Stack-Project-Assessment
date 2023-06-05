import React, { useState, useEffect } from "react";
import "./App.css";
import AddVideo from "./AddVideo";

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, [videos]);

  async function fetchVideos() {
    try {
      const response = await fetch("http://localhost:9999");
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error(error);
    }
  }

  function addVideo(newVideo) {
    setVideos((prevVideos) => [...prevVideos, newVideo]);
    //  fetchVideos();
  }

  function voteUp(videoId) {
    const updatedVideos = videos.map((video) => {
      if (video.id === videoId) {
        const updatedVideo = {
          ...video,
          rating: video.rating + 1,
        };
        updateVideoRating(updatedVideo);
        return updatedVideo;
      }
      return video;
    });
    setVideos(updatedVideos);
  }

  function voteDown(videoId) {
    const updatedVideos = videos.map((video) => {
      if (video.id === videoId) {
        const updatedVideo = {
          ...video,
          rating: video.rating - 1,
        };
        updateVideoRating(updatedVideo);
        return updatedVideo;
      }
      return video;
    });
    setVideos(updatedVideos);
  }

  async function updateVideoRating(updatedVideo) {
    try {
      const response = await fetch(`http://localhost:9999/${updatedVideo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: updatedVideo.rating }),
      });

      if (!response.ok) {
        throw new Error("Failed to update video rating");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const sortedVideos = [...videos].sort((a, b) => b.rating - a.rating);

  async function deleteVideo(videoId) {
    try {
      const response = await fetch(`http://localhost:9999/${videoId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete video");
      }

      setVideos((prevVideos) =>
        prevVideos.filter((video) => video.id !== videoId)
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <h1 className="">Khadija's Video Recommendation</h1>
        </nav>
      </header>
      <AddVideo onAddVideo={addVideo} />
      <div className="card-container">
        {sortedVideos.map((video) => {
          return (
            <div className="new-video" key={video.id}>
              <iframe
                width="100%"
                height="150"
                src={
                  video.url
                    ? `https://www.youtube.com/embed/${video.url.slice(32)}`
                    : ""
                }
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <h3 className="title"> Title:{video.title}</h3>
              <h3>Rating: {video.rating}</h3>
              <div className="video-buttons-container">
                <button id="vote-btn" onClick={() => voteUp(video.id)}>
                  <img
                    className="rating-buttons"
                    src="/icons/thumbs-up-solid.svg"
                    alt="thumbs up"
                  />
                </button>
                <button id="vote-btn" onClick={() => voteDown(video.id)}>
                  <img
                    className="rating-buttons"
                    src="/icons/thumbs-down-solid.svg"
                    alt="thumbs down"
                  />
                </button>
                <button id="delete-btn" onClick={() => deleteVideo(video.id)}>
                  <img
                    className="rating-buttons"
                    src="/icons/trash-can-solid.svg"
                    alt="delete button"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
