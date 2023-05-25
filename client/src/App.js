import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import Header from "./components/Header";
import AddVideoForm from "./components/AddVideoForm";
import VideoCard from "./components/VideoCard";
import SortFilters from "./components/SortFilters";
import Search from "./components/Search";
import "./App.css";
// import data from "./exampleresponse.json";

function App() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5001");
      if (!response.ok) {
        throw new Error("Failed to fetch videos!");
      }
      const data = await response.json();
      setVideos(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const addVideo = async (video) => {
    try {
      const response = await fetch("http://127.0.0.1:5001", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(video),
      });
      if (!response.ok) {
        throw new Error("Failed to add video!");
      }
      const data = await response.json();
      const videoWithDate = { ...video, id: data.id, rating: 0 };
      setVideos([videoWithDate, ...videos]);
    } catch (error) {
      setError(error.message);
    }
  };

  const removeVideo = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Video not found!");
      }
      setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const upVote = (id) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id === id) {
          return { ...video, rating: video.rating + 1 };
        }
        return video;
      })
    );
  };

  const downVote = (id) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id === id) {
          return { ...video, rating: video.rating - 1 };
        }
        return video;
      })
    );
  };

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const sortByVotes = (sortOrder) => {
    const sortedVideos = [...videos].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.rating - b.rating;
      } else {
        return b.rating - a.rating;
      }
    });
    setVideos(sortedVideos);
  };

  const sortByTitle = (sortOrder) => {
    const sortedVideos = [...videos].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setVideos(sortedVideos);
  };

  const searchVideos = (searchTerm) => {
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVideos(filtered);
  };

  const displayedVideos = filteredVideos.length > 0 ? filteredVideos : videos;

  return (
    <Container maxWidth="lg">
      <Header videos={videos} />

      <div className="App">
        <AddVideoForm onAddVideo={addVideo} />

        <div className="video-section">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              <div className="header-controls">
                <SortFilters
                  onSortByVotes={sortByVotes}
                  onSortByTitle={sortByTitle}
                />
                <Search onSearch={searchVideos} />
                <button onClick={toggleSortOrder}>
                  {sortOrder === "asc" ? "Order Descending" : "Order Ascending"}
                </button>
              </div>
              <div className="video-list">
                {displayedVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    removeVideo={removeVideo}
                    upVote={upVote}
                    downVote={downVote}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}

export default App;
