import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import VCard from "./components/VCard";
//import videos from "./exampleresponse.json";
import AddVideo from "./components/AddVideo";

const App = () => {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((response) => response.json())
      .then((data) => {
        setVideoData(data);
        console.log(data);
      })

      .catch((error) => console.log(error));
  }, []);

  const updateVideoData = (newVideoData) => {
    fetch("http://127.0.0.1:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideoData),
    })
      .then((response) => response.json())
      .then((data) => setVideoData(data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Header />
      <AddVideo updateVideoData={updateVideoData} />
      <VCard videoData={videoData} />
    </div>
  );
};

export default App;
