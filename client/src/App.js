import React, { useState, useEffect } from "react";

import "./App.css";
// import videoImport from "./exampleresponse.json";
import Video from "./Video.js";
import AddVid from "./AddVid.js";

function App() {
  const [videos, setVideos] = useState([]);

  const [del, setDel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:5000");
      const jsonResult = await result.json();
      setDel(jsonResult);
    };
    fetchData();
  }, []);

  const removeVid = async (id) => {
    await fetch(`http://localhost:5000/${id}`, { method: "DELETE" });

    let newDel = del.filter((el) => el.id !== id);
    setDel(newDel);
  };

  const newVideoData = (newVideo) => {
    // Generate a unique ID for the new video
    const newId = Math.floor(Math.random() * 1000000);
    // setVideos(videoImport) => videoImport.

    // Create a new video object with the input data and the generated ID
    const newVideoObj = {
      id: newId,
      title: newVideo.title,
      url: newVideo.url,
      rating: 0,
    };

    // Add the new video object to the list of videos
    setVideos([...videos, newVideoObj]);

    // Delete videos from array
    setDel([...del, newVideoObj]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div>
        <AddVid newVideoData={newVideoData} />
      </div>
      <body>
        {del.map((video, index) => (
          <Video removeVid={removeVid} index={index} video={video} />
        ))}
      </body>
    </div>
  );
}

export default App;
