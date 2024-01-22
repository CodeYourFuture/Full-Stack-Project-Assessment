import React, { useState, useEffect } from "react";
import VideoList from "./components/VideoList";
import VideoAdder from "./components/VideoAdder";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
const App = () => {
  const videoUrl = "https://www.youtube.com/embed/";

  const [videos, setVideos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [originalVideos, setOriginalVideos] = useState([]);
  const [sortVideos, setSortVideos] = useState({
    sortBy: "rating",
    sortDirection: "desc",
  });
  // Helper function to get the Video Url Link
  const getVideoUrl = function (video) {
    const regex = /v=([^&]*)/;
    const match = video.url.match(regex);
    let container = {};
    if (match) {
      const videoId = match[1];
      const videoLink = videoUrl.concat(videoId);
      container = { ...video, url: videoLink };
    }
    return container;
  };

  const fetchVideos = async () => {
    try {
      const url = `http://localhost:5000/videos`;
      const response = await fetch(url);
      const data = await response.json();
      const newVideoArray = data.map((video) => {
        return getVideoUrl(video);
      });
      newVideoArray.sort((a, b) => b.rating - a.rating);
      setVideos(newVideoArray);
      setOriginalVideos(newVideoArray);
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const onVote = async (id, vote) => {
    try {
      const response = await fetch(`http://localhost:5000/videos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vote }),
      });
      const updatedVideo = await response.json();

      setVideos(
        videos.map((video) => {
          if (video.id === id) {
            return { ...video, rating: updatedVideo.rating };
          }
          return video;
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const onRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/videos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setVideos(videos.filter((video) => video.id !== id));
      } else {
        console.error("Error deleting video");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onAdd = async (video) => {
    try {
      const response = await fetch("http://localhost:5000/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(video),
      });

      if (!response.ok) {
        throw new Error("Failed to add video. Please try again later.");
      }

      if (response.ok) {
        const newVideo = await response.json();
        setVideos([...videos, { ...getVideoUrl(newVideo) }]);
        setIsOpen(false);
      } else {
        console.error("Error adding video");
      }
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  const onSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setVideos(originalVideos); // if search term is empty, show all videos
    } else {
      const filteredVideos = originalVideos.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setVideos(filteredVideos); // otherwise, filter videos by title
    }
  };

  const handleSort = (sortBy) => {
    const sortedVideos = [...videos].sort((a, b) => {
      if (sortBy === "title") {
        if (sortVideos.sortDirection === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      } else {
        if (sortVideos.sortDirection === "asc") {
          return a.rating - b.rating;
        } else {
          return b.rating - a.rating;
        }
      }
    });

    setVideos(sortedVideos);
    setSortVideos({
      sortBy: sortBy,
      sortDirection: sortVideos.sortDirection === "asc" ? "desc" : "asc",
    });
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      {error && <p>Failed to load resource: net::ERR_CONNECTION_REFUSED</p>}
      <NavBar
        onSearch={onSearch}
        onAdd={onAdd}
        setIsOpen={setIsOpen}
        sortingVideos={handleSort}
        sortVideos={sortVideos}
        setSortVideos={setSortVideos}
      />
      <VideoAdder
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onAdd={onAdd}
        onClose={onClose}
      />

      <div className="flex flex-wrap">
        <VideoList videos={videos} onVote={onVote} onRemove={onRemove} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
