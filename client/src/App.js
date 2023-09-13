import React, { useState, useEffect } from "react";
import "./App.css";
import Videocard from "./Videocard";
import AddingItem from "./AddingItem";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
    .then(response => response.json())
    .then(data => {setVideos(data); setLoading(false); console.log(data)})
    .catch(error => console.log(error));
  }, [updated]);

  const addVideo = (newVideo) => {
    fetch("http://127.0.0.1:5000/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newVideo)
})
.then(response => response.json())
.then(data => {
    console.log("Response:", data);
    setUpdated(!updated)
})
.catch(error => {
    console.error("Error:", error);
});
  };

  const upVote = (video) => {
    const updatedVideos = videos.map((v) =>
      v === video ? { ...v, rating: v.rating + 1 } : v
    );
    setVideos(updatedVideos);
    
    fetch(`http://127.0.0.1:5000/update_rating`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({id: video.id, rating: video.rating+1})}).then(response => response.json()).then(data => console.log(data))
    .catch(error => console.log("Error: ", error));
  }

  const downVote = (video) => {
    const updatedVideos = videos.map((v) =>
      v === video ? { ...v, rating: v.rating - 1 } : v
    );
    setVideos(updatedVideos);
    fetch(`http://127.0.0.1:5000/update_rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: video.id, rating: video.rating - 1 }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log("Error: ", error));
  };

  const removeVideo = (video) => {
    fetch(`http://127.0.0.1:5000/${video.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => { 
        console.log("Response:", data);
        setUpdated(!updated)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container-fluid">
      <header className="header">
        <h1>Video Recommendations</h1>
      </header>
      <div className="control-panel">
        <AddingItem addVideo={addVideo} />
        <button
          className="btn btn-warning"
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
        >
          Toggle Sort Order
        </button>
      </div>

      <ErrorBoundary
        fallback={<div>Could not connect to the server, sorry....</div>}
      >
        {loading && "Loading..."}
        {!loading && Array.isArray(videos) && videos.length > 0 ? (
          <div className="video-container">
            {videos
              .slice()
              .sort((a, b) =>
                sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating
              )
              .map((video) => (
                <Videocard
                  key={video.id}
                  video={video}
                  onUpVote={upVote}
                  onDownVote={downVote}
                  onRemove={removeVideo}
                />
              ))}
          </div>
        ) : (
          <div>No videos available.</div>
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
