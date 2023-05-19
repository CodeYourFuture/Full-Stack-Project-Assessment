import React, {useState} from 'react';
import videoData from '../../exampleresponse.json';
import NewVideoForm from './NewVideoForm';
import "./App.css";

function App() {
  const [videos, setVideos] = useState(videoData);

  function newVideo(video) {
    const newAddedVideos = videos.concat(video);
    setVideos(newAddedVideos);
  }

  function voteDown(videoId) {
    const updatedVideos = videos.map((video) => {
      if (video.id === videoId) {
        return {
          ...video, rating:video.rating - 1,
        };
      }
      return video;
    });
    setVideos(updatedVideos);
  }

  function voteUp(videoId) {
    const updatedVideos = videos.map((video) => {
      if (video.id === videoId) {
        return {
          ...video, rating:video.rating + 1,
        };
      }
      return video;
    });
    setVideos(updatedVideos);
  }
  
  function deleteVideo(videoId) {
    const updatedVideos = video.filter((video) => video.id !== videoId);
    setVideos(updatedVideos);
  }

  const sortedVideos = videos.concat().sort((b,a) => {
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
        <h1>Video Recommendation</h1>
      </header>
    </div>
  );
}

export default App;
