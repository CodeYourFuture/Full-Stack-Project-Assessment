import React from "react";
import "./App.css";
import AddAndSearch from "./components/AddAndSearch";
import AllVideos from './components/AllVideos'
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    try {
      const response = await axios.get(`/api/videos`);
      const data = response.data;
      setVideos(data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getVideos();
  }, []);

  const handleDelete = async (id) => {
    console.log(id)
    try {
      const response = await axios.delete(`/api/videos/${id}`);
      console.log(response)
      console.log(`video with id ${id} deleted`)
    } catch (error) {
      console.log("Something went wrong", error)
    }
    const newData = videos.filter((result) => result.id !== id)
    setVideos(newData);

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
