import React, { useEffect, useState } from "react";
import VideoList from "./components/VideoList";
import AddVideoForm from "./components/AddVideoForm";

const App = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    fetch("http://localhost:5000/videos")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddVideo = (title, url) => {
    const video = {
      title: title,
      url: url,
    };

    fetch("http://localhost:5000/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(video),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          // Video added successfully
          fetchVideos(); // Fetch the updated list of videos
        } else {
          // Failed to add video
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleVote = (videoId, increment) => {
    const updatedVideos = videos.map((video) => {
      if (video.id === videoId) {
        return { ...video, votes: video.votes + increment };
      }
      return video;
    });

    fetch(`http://localhost:5000/videos/${videoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        votes: updatedVideos.find((video) => video.id === videoId).votes,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          // Vote updated successfully
          setVideos(updatedVideos);
        } else {
          // Failed to update vote
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveVideo = (videoId) => {
    fetch(`http://localhost:5000/videos/${videoId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          // Video removed successfully
          setVideos(videos.filter((video) => video.id !== videoId));
        } else {
          // Failed to remove video
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
      window.location.reload();

      
  };

  return (
    <div>
      <h1>Video Website</h1>
      <VideoList
        videos={videos}
        handleVote={handleVote}
        handleRemove={handleRemoveVideo}
      />
      <AddVideoForm handleAddVideo={handleAddVideo} />
    </div>
  );
};

export default App;
