import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import AddVideo from "./components/AddVideo";
import VideoCards from "./components/VideoCards";

const baseUrl = "https://video-recommendation-hr7c.onrender.com";

function App() {
  const [videos, setVideos] = useState([]);
  const [search, setNewSearch] = useState("");

  useEffect(() => {
    fetch(`${baseUrl}`)
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  const handleAddVideo = (newVideo) => {
    fetch(`${baseUrl}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Video added successfully with ID:", data.id);
        console.log("Server Response:", data); // Log the entire response
      })
      .catch((error) => console.error("Error adding video:", error));
  };

  const handleRemove = (title) => {
    const updatedVideos = videos.filter((video) => video.title !== title);
    setVideos(updatedVideos);

    fetch(`${title}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result["result"] !== "failure") {
          handleAddVideo();
        } else {
          console.log("could not delete");
        }
      });
  };

  const handleSearch = (event) => {
    const newSearch = event.target.value;
    setNewSearch(newSearch);
  };

  return (
    <div className="App">
      <Header
        search={search}
        onSearch={(newSearch) => setNewSearch(newSearch)}
      />
      <AddVideo onAddVideo={handleAddVideo} />
      <VideoCards videos={videos} onRemove={handleRemove} search={search} />
    </div>
  );
}

export default App;
