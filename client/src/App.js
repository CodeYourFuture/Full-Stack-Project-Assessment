import React, { useState, useEffect } from "react";
import "./App.css";
import Video from "./Video";
import AddVideo from "./AddVideo";

function App() {
  const [videoList, setVideoList] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc");

  //Get all videos
  useEffect(() => {
    fetch(`/videos?order=${sortOrder}`)
      .then((response) => response.json())
      .then((data) => setVideoList(data))
      .catch((error) => console.error(error));
  }, [refresh, sortOrder]);
console.log(`/videos?order=${sortOrder}`);
console.log(videoList);

// handle the sorting order
  function handleSortOrderChange() {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  }

  //delete video
  function handleDelete(id) {
    fetch(`/videos/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the video");
        }
        return response.json();
      })
      .then((data) => {
        setRefresh(refresh + 1);
        alert(data.message);
      })
      .catch((error) => console.error(error));
  }

  //ADD new Video
  function handleAdd(newVideo) {
    fetch("/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add video");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        setRefresh(refresh + 1);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <button className="btn btn-dark" onClick={handleSortOrderChange}>
          {sortOrder === "desc" ? "Sort Ascending" : "Sort Descending"}
        </button>
      </header>
      <section>
        <div className="video-List">
          {videoList.map((video, key) => (
            <Video video={video} key={key} handleDelete={handleDelete} />
          ))}
        </div>
        <div className="add-Video">
          <AddVideo onAdd={handleAdd} />
        </div>
      </section>
    </div>
  );
}

export default App;
