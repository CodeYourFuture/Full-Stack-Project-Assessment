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
        <h1>Tony's Video App</h1>
      </header>
      {sortedVideos.map((video) => {
        return (
          <div>
            <h3>
              Title: {video.title}
            </h3>

            <iframe width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.url.slice(32)}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen >

            </iframe>

            <h3>
              Rating: {video.rating}
            </h3>
            <div className='voting' >
              <button id='vote' on onClick={() => voteUp(video.id)}> Up Vote</button>
              <button id='vote' on onClick={() => voteDown(video.id)}> Down Vote</button>
              
            </div>
            <div className='delete'>
              <button id='delete-btn' on onClick={() => deleteVideo(video.id)}> Delete Video</button>
            </div>
          </div>
        );
      })}
      <NewVideoForm newVideoAdded = {newVideo} />
      
    </div>
  );
}

export default App;
