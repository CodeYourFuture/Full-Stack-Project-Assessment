import React, { useState } from "react";
import exampleresponse from "./exampleresponse.json";
import AddVideoForm from "./AddVideoForm";

function App() {
  const [videos, setVideos] = useState(exampleresponse);
  
  function addNewVideo(video){
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

    const sortedVideos = videos.concat().sort(( a, b) => {
      if (a.rating > b.rating){
        return -1
      }else if(a.rating === b.rating){
        return 0
      }else if(a.rating < b.rating){
        return 1
      }
    })

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      {sortedVideos.map((video) => {
        return (
          <div className="newvideos" key={video.id}>
            <h3> Title:{video.title}</h3>

            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.url.slice(32)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <h3>Rating: {video.rating}</h3>
            <button id="vote-btn" onClick={() => voteUp(video.id)}>
              Up Vote
            </button>
            <button id="vote-btn" onClick={() => voteDown(video.id)}>
              Down Vote
            </button>
            <button id="delete-btn" onClick={() => deleteVideo(video.id)}>
              DELETE
            </button>
          </div>
        );
      })}
      <AddVideoForm onAddVideo={addNewVideo} />
    </div>
  );
}

export default App;
