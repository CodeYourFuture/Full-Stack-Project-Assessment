import React, { useState, useEffect } from 'react';
import "./App.css";
import Header from './components/Header';
// import videosData from "./exampleresponse.json";
import AllVideoCards from './components/AllVideoCards';

function App() {
  const [videos, setVideos] = useState([]);

  const fetchData = () => {
    fetch(`http://localhost:5000/`)
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }
  useEffect(()=> {
    fetchData()
   }, []); 
   
  return (
    <div className="App">
      <Header videos={videos} setVideos={setVideos} />
      <AllVideoCards
        videos={videos}
        setVideos={setVideos}
        fetchData={fetchData}
      />
    </div>
  );
}

export default App;
