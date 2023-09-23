import React, { useState, useEffect } from "react";
import "./App.css";
import Videocard from "./components/Videocard";
import Addvideo from "./components/Addvideo";

function App() {
  const [videos, setVideos] = useState([]);
  // const [enterTitle, setEnterTitle] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setVideos(data);
      });
  }, []);

  const videoElements = videos.map((video) => {
    return (
      <Videocard
        key={video.id} // Assuming video has a unique id property
        name={video.title}
        link={video.url}
        rating={video.rating}
        plusRating={plusRating}
        subtractRating={subtractRating}
        deleteVideo={deleteVideo}
      />
    );
  });

  function addNewVideo(newVideo) {
    setVideos([...videos, newVideo]);
  }

  function plusRating(videoTitle, currentRating) {
    // Find the video in the videos array by its title
    const updatedVideos = videos.map((video) => {
      if (video.title === videoTitle) {
        return { ...video, rating: currentRating + 1 };
      }
      return video;
    });

    // Update the state with the new videos array
    setVideos(updatedVideos);
    fetch(`http://127.0.0.1:5000/${videoTitle}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ rating: currentRating + 1}),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update rating');
      }
    })
    .catch((error) => {
      console.error(error);
      // Handle the error, e.g., display an error message to the user
    });
  }


  function deleteVideo(videoTitle) {
    // Filter out the video with the specified title and update the state
    const updatedVideos = videos.filter((video) => video.title !== videoTitle);
    setVideos(updatedVideos);
  
    // Send a DELETE request to your server to remove the video
    fetch(`http://127.0.0.1:5000/${videoTitle}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete the video');
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle the error, e.g., display an error message to the user
      });
  }
  







  function subtractRating(videoTitle) {
    // Find the video in the videos array by its title
    const updatedVideos = videos.map((video) => {
      if (video.title === videoTitle) {
        // Make sure the rating doesn't go below 0
        return { ...video, rating: Math.max(0, video.rating - 1) };
      }
      return video;
    });

    // Update the state with the new videos array
    setVideos(updatedVideos);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <Addvideo addVideo={addNewVideo} />
      <div>{videoElements}</div>
    </div>
  );
}

export default App;
