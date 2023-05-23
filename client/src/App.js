import { useState } from "react";
import Header from "./components/Header";
import AddVideoForm from "./components/AddVideoForm";
import VideoCard from "./components/VideoCard";
import SortFilters from "./components/SortFilters";
import data from "./exampleresponse.json";
import "./App.css";
import Search from "./components/Search";

function App() {
  const [videos, setVideos] = useState(data);

  const addVideo = (video) => {
    setVideos([video, ...videos]);
  };

  const removeVideo = (id) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
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

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <AddVideoForm onAddVideo={addVideo} />

      <div className="video-section">
        <div className="header-controls">
          <SortFilters
            onSortByVotes={sortByVotes}
            onSortByTitle={sortByTitle}
          />
          <Search />
        </div>
        <div className="video-list">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              removeVideo={removeVideo}
              upVote={upVote}
              downVote={downVote}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
