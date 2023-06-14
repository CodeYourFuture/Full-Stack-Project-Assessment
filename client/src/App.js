import React,{ useEffect, useState } from "react";
import "./App.css";
import VideoCards   from "./VideoCards";
import AddVideo  from "./AddVideo";
import data from './exampleresponse.json';
import OrderButton from "./OrderButton";
import Footer from "./Footer";

function App() {
  
  const [videos, setVideos] = useState(data);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState("");

  console.log(data)
  console.log("videos....")
  console.log(videos)

useEffect(() => {
  fetch(`http://localhost:5000/?order=${order}`, {
    mode: "cors",
  })
  .then((res) => {
    if(!res.ok) throw new Error(`HTTP error! status code ${res.status}`);
    return res.json();
  })
  .then((data) => {
    setVideos(data);
  })
  .catch((error) => {
    setError("Error", error);
  });
}, [order]);

  return (
    <div className="App">
      <header className="App-header">
      <a href="/index.html" alt="Play button animation" className="play-btn">
          .
        </a>
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo videos={videos} 
      setVideos={setVideos} />
      <VideoCards videos={videos} 
      setVideos={setVideos} />
      <OrderButton 
       videos={videos}
       setVideos={setVideos}
       order={order}
       setOrder={setOrder}
       />
       <Footer />
    </div>
  );
}

export default App;
