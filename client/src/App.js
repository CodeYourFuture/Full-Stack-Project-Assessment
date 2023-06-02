import React, { useState } from "react";
import exampleresponse from "./exampleresponse.json";
import AddVideo from "./AddVideo";

function App() {
  const [videos, setVideos] = useState(exampleresponse);

  function addVideo(newVideo) {
    setVideos([...videos, newVideo]);
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
  const sortedVideos = [...videos].sort((a, b) => b.rating - a.rating);

  function deleteVideo(videoId) {
    const updatedVideos = videos.filter((video) => video.id !== videoId);
    setVideos(updatedVideos);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo onAddVideo={addVideo} />
      {sortedVideos.map((video) => {
        return (
          <div className="newvideos" key={video.id}>
            <h3> Title:{video.title}</h3>

            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.url.slice(32)}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h3>Rating: {video.rating}</h3>
            <button id="vote-btn" onClick={() => voteUp(video.id)}>
              vote up
            </button>
            <button id="vote-btn" onClick={() => voteDown(video.id)}>
              vote down
            </button>
            <button id="delete-btn" onClick={() => deleteVideo(video.id)}>
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
