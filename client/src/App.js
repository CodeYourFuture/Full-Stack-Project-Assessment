import React, { useState, useEffect } from 'react';
import "./App.css";
import Header from './components/Header';
// import videosData from "./exampleresponse.json";
import AllVideoCards from './components/AllVideoCards';

function App() {
  const [videos, setVideos] = useState([]);
// fetch data
  const fetchData = () => {
    fetch('https://fullstack-gulnihal.herokuapp.com/', {
    headers: {        "Access-Control-Allow-Origin": "*",        "Access-Control-Allow-Methods":          "GET, POST, PATCH, PUT, DELETE, OPTIONS",        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        Accept: "application/json",        "Content-type": "application/json" 
      }
    })
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
