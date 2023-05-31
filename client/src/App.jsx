import "./App.css";
import React, { useState, useEffect } from "react";
import AddVideo from "./AddVideo";
// import Header from "./Header";


import VideoComponent from "./VideoComponent";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [isDesc, setIsDesc] = useState(true);
 


const url = "http://localhost:5000/videos";

useEffect(() => {
    function fetchData() {
      fetch(`${url}?sort=${isDesc ? "desc" : "asc"}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setVideos(data);
        })
        .catch((error) => error);
    }
    fetchData();

  }, [isDesc]);

  return (

    <div className="App">
      <AddVideo videos={videos} setVideos={setVideos} />
      <VideoComponent videos={videos} setVideos={setVideos} />
      <button onClick = {() => {setIsDesc(!isDesc)}}>change order</button>
    </div>
  );
};

export default App;
