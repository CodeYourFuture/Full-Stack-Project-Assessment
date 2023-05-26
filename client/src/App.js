import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Header from "./components/Header";
import AddVideoForm from "./components/AddVideoForm";
import VideoCard from "./components/VideoCard";
import SortFilters from "./components/SortFilters";
import Search from "./components/Search";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        "https://full-stack-project-assessment-1fgd.onrender.com"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch videos!");
      }
      const data = await response.json();
      const updatedVideos = data.map((video) => {
        if (!video.uploadedDate) {
          return { ...video, uploadedDate: "2021-01-01T00:00:00.000Z" };
        }
        return video;
      });
      setVideos(updatedVideos);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const addVideo = async (video) => {
    try {
      const response = await fetch(
        "https://full-stack-project-assessment-1fgd.onrender.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(video),
        }
      );
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
      const response = await fetch(
        `https://full-stack-project-assessment-1fgd.onrender.com/${id}`,
        {
          method: "DELETE",
        }
      );
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
