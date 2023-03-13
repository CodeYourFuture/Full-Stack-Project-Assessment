import React, { useState, useEffect } from "react";
import "./App.css";
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

    setDel(del.filter((el) => el.id !== id));
  };

  const newVideoData = async (newVideo) => {
    const response = await fetch("http://localhost:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    });
    const data = await response.json();
    console.log(data);

    // Add the new video object to the list of videos
    setVideos([...videos, data]);
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
