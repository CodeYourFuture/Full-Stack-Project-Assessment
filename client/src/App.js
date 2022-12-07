import React from "react";
import "./App.css";
import data from "./exampleresponse.json";
import AddAndSearch from "./components/AddAndSearch";
import AllVideos from './components/AllVideos'
import { useState } from 'react';

function App() {
  const [videos, setVideos] = useState(data);
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
