import "./App.css";
import React, { useState, useEffect } from "react";
import AddVideo from "./AddVideo";
// import React, {useState, useEffect} from "react";
import { OrderButton } from "./OrderButton";
import VideoComponent from "./VideoComponent";

const App = () => {
  const [videos, setVideos] = useState([]);
  // const [ascending, setAscending] =useState(false)
   const [error, setError] = useState(null);
   const [order, setOrder] = useState("");
   const [isDesc, setIsDesc] = useState(true);
  async function fetchData() {
    try {
      const fetchURL =
      `http://localhost:5000/videos`;
      const response = await fetch(fetchURL );

      console.log(response);
      const data = await response.json();
      console.log(data);
      setVideos(data.videos);
      // Code to handle the data will be added here
    } catch (error) {
      setError("Error", error);
      console.log(error);
    }
  }
   

  useEffect(() => {
    fetchData();
    console.log("useEffect");
  }, [order]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo videos={videos} setVideos={setVideos} />
      <OrderButton
        videos={videos}
        setVideos={setVideos}
        order={order}
        setOrder={setOrder}
      />
      <VideoComponent videos={videos} setVideos={setVideos} />
      <button
        onClick={() => {
          setIsDesc(!isDesc);
        }}
      >
        change order
      </button>
    </div>
  );
};

export default App;
