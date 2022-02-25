import { React, useState, useEffect } from "react";
import "./App.css";
import AddVideo from "./AddVideo";
import ListOfVideos from "./ListOfVideos";
import "./App.css";

function App(props) {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(`http://127.0.0.1:5000`);
      const data = await response.json();
      setVideoData(data);
    };

    fetchVideos();
  }, []);

  async function addVideoHandler(video) {
    const response = await fetch(`http://127.0.0.1:5000`, {
      method: "POST",
      body: JSON.stringify(video),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  }

  async function deleteHandler(videoID) {
    const response = await fetch(`http://127.0.0.1:5000/${videoID}`, {
      method: "DELETE",
    });
    const data = await response.json();

    console.log(data);
  }

  return (
    <div className="App">
      <header className="App-header bg-primary text-white">
        <h1>Video Recommendation</h1>
      </header>

      <AddVideo onAddVideo={addVideoHandler} />
      <ListOfVideos Videos={videoData} delete={deleteHandler} />
    </div>
  );
}

export default App;
