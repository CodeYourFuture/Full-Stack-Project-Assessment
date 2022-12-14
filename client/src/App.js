import React from "react";
import "./App.css";
import AddAndSearch from "./components/AddAndSearch";
import AllVideos from './components/AllVideos'
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {

    axios.get(`http://localhost:5000/`)
      .then(res => {
        const videos = res.data;
        console.log(videos)
        setVideos(videos);
      })
    // const url = `http://localhost:5000/`;
    // fetch(url)
    //   .then((res) => {
    //     console.log(res);
    //     if (res.status === 200) {
    //       return res.json();
    //     }
    //   })
    //   .then((videos) => {
    //     console.log(videos);
    //     setVideos(videos);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const newData = videos.filter(elem => elem.id !== id)
    setVideos(newData)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddAndSearch videos={videos} setVideos={setVideos} />
      <AllVideos videos={videos} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
