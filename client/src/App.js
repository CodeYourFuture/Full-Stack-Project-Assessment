import React, { useState, useEffect } from "react";
import "./App.css";
import Video from "./Video";
import AddVideo from "./AddVideo";

function App() {
  const [videoList, setVideoList] = useState([]);

  //Get all videos
  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then((response) => response.json())
      .then((data) => setVideoList(data))
      .catch((error) => console.error(error));
  }, []);

  //delete video
  function handleDelete(id) {
    fetch(`http://localhost:5000/videos/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "success") {
          setVideoList(data.videoList);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error(error));
  }

  //ADD new Video
  function handleAdd(newVideo) {
    fetch("http://localhost:5000/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then((data) => setVideoList(data))
      .catch((error) => console.error(error));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
        <div className="video-List">
          {videoList.map((video, key) => (
            <Video video={video} key={key} handleDelete={handleDelete} />
          ))}
        </div>
        <div className="add-Video">
          <AddVideo onAdd={handleAdd} />
        </div>
      </body>
    </div>
  );
}

export default App;
