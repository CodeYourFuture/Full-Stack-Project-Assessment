import React, { useState, useEffect } from "react";
//import videos from "./exampleresponse.json";
import Header from "./Header";
import VCard from "./VCard";
import AddVideo from "./AddVideo";

const HomePage = () => {
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

  const deleteVideo = (videoId) => {
    // Make a DELETE request to the server with the videoId
    fetch(`http://127.0.0.1:5000/${videoId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setVideoData(data);
        console.log(data);
      })

      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Header />
      <AddVideo updateVideoData={updateVideoData} />
      <VCard videoData={videoData} onDelete={deleteVideo} />
    </div>
  );
};

export default HomePage;
