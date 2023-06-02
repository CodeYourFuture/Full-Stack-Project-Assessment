import React, { useState, useEffect } from "react";
// import exampleresponse from "./exampleresponse.json";
import AddVideo from "./AddVideo";

function App() {
  const [videos, setVideos] = useState([]);

   useEffect(() => {
     fetchVideos();
   }, []);

   async function fetchVideos() {
     try {
       const response = await fetch("http://localhost:9999"); // Replace with your API endpoint
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
     fetchVideos(); // Call fetchVideos after adding a new video
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

            <h3>Rating: {video.rating}</h3>
            <button id="vote-btn" onClick={() => voteUp(video.id)}>
              👍
            </button>
            <button id="vote-btn" onClick={() => voteDown(video.id)}>
              👎
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
