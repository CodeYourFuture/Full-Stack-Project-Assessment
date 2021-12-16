import React, { useState, useEffect } from 'react';
import "./App.css";
import Header from './components/Header';
// import videosData from "./exampleresponse.json";
import AllVideoCards from './components/AllVideoCards';

function App() {
  const [videos, setVideos] = useState([]);
// fetch data
  const fetchData = () => {
    fetch(`https://gulnihal-fullstack-project.herokuapp.com/`)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.rating - b.rating);
        setVideos(data);
      });
  }
  useEffect(()=> {
    fetchData()
   }, []); 
   
  return (
    <div className="App">
      <Header videos={videos} setVideos={setVideos} fetchData={fetchData} />
      <AllVideoCards
        videos={videos}
        setVideos={setVideos}
        fetchData={fetchData}
      />
    </div>
  );
}

export default App;
