import React, { useState, useEffect } from "react";
import "./styles.css";
import Video from "./Video";
import AddVideo from "./AddVideo";

const apiUrl = "https://full-stack-videos.onrender.com" || "http://localhost:5000";

function App() {
  const [videos, setVideos] = useState([]);
  const [order, setOrder] = useState("desc"); //Order line desc or asc

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        // "https://full-stack-videos.onrender.com/videos"
        (`${apiUrl}/videos`)
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }
      const data = await response.json();
      const sortedData =
        order === "desc"
          ? data.sort((a, b) => a.title.localeCompare(b.title))
          : data.sort((a, b) => b.title.localeCompare(a.title));
      setVideos(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [order]);

const toggleOrder = () => {
  const newOrder = order === "desc" ? "asc" : "desc";
  setOrder(newOrder);

  // Update the videos list based on the new order
  const sortedData = [...videos].sort((a, b) => {
    if (newOrder === "asc") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  setVideos(sortedData);
};

  const handleVote = (id, increment) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === id ? { ...video, votes: video.votes + increment } : video
      )
    );
  };

const handleRemove = (id) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
      fetch(
      // (`https://full-stack-videos.onrender.com/videos/${id}`
      (`${apiUrl}/videos/${id}`), {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log(
              `Video with ID ${id} deleted successfully on the server`
            );
          } else {
            console.error(`Error deleting video with ID ${id} on the server`);
          }
        })
        .catch((error) =>
          console.error("Error deleting video on the server:", error)
        );
    };

  const handleAddVideo = (newVideo) => {
     
    fetch(
    // ("https://full-stack-videos.onrender.com/videos",
    (`${apiUrl}/videos`),{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then((data) => {
        // Check if the video with the same ID already exists
        const existingVideoIndex = videos.findIndex(
          (video) => video.id === data.id
        );

        if (existingVideoIndex !== -1) {
          const updatedVideos = [...videos];
          updatedVideos[existingVideoIndex] = {
            ...newVideo,
            id: data.id,
            votes: 0,
            uploadDate: data.uploadDate,
          };
          setVideos(updatedVideos);
        } else {
          // If it doesn't exist, add the new video
          setVideos((prevVideos) => [
            ...prevVideos,
            { ...newVideo, id: data.id, votes: 0, uploadDate: data.uploadDate },
          ]);
        }
      })
      .catch((error) => console.error("Error adding video:", error));
    console.log("Updated videos:", videos); 
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header-video">Video Recommendation</h1>
        <button onClick={toggleOrder}>
          {order === "desc" ? "Order Ascending" : "Order Descending"}
        </button>
        {videos.map((video) => (
          <Video
            key={video.id}
            video={video}
            onVoteUp={() => handleVote(video.id, 1)}
            onVoteDown={() => handleVote(video.id, -1)}
            onRemove={() => handleRemove(video.id)}
          />
        ))}
        <AddVideo onAddVideo={handleAddVideo} />
      </header>
    </div>
  );
}

export default App;
