import React, { useState, useEffect } from 'react';
import './App.css';
import videoData from "./components/exampleresponse.json";
import Video from "./components/Video";
import Links from "./components/Links";
import AddVideo from './components/AddVideo';


function App() {

  const [videos, setVideos] = useState ([]);
  //const [enterTitle, setEnterTitle] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setVideos(data);
      });
  }, []);

  const videoEl = videos.map((video) => {
    return (
      <Video
        key={video.id} 
        name={video.title}
        link={video.url}
        rating={video.rating}
        plusRating={AddRating}
        subtractRating={minusRating}
        deleteVideo={deleteVideo}
      />
    );
  });

  const youTubeLinks = videoData.map((video) => {
    return <Links link={video.url}/>
  });

  function AddRating (videoTitle, currentRating) {
    const updatedVid = videos.map((video) => {
      if (video.title === videoTitle) {
        return {...video, rating: currentRating + 1}
      }
      return video;
    });
    setVideos(updatedVid);
    fetch(`http://127.0.0.1:5000/${videoTitle}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ rating: currentRating + 1}),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteVideo(videoTitle) {
  const updatedVideos = videos.filter((video) => video.title !== videoTitle);
  setVideos(updatedVideos);

  fetch(`http://127.0.0.1:5000/${videoTitle}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

 function minusRating (videoTitle) {
  const updatedVid = videos.map((video) => {
    if (video.title === videoTitle) {
      return {...video, rating: Math.max(0, video.rating - 1)};
    }
    return video;
  });
  setVideos(updatedVid);
}

function addNewVideo(newVideo) {
  setVideos([...videos, newVideo]);
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo addVideo={addNewVideo} />
      <div>{videoEl}</div>
      <div>{youTubeLinks}</div>
    </div>
  );
};

export default App;