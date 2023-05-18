import React, { useState, useEffect } from "react";
//import videos from "./exampleresponse.json";
import "./HomePage.css";
import Header from "./Header";
import VCard from "./VCard";
import AddVideo from "./AddVideo";
import Sort from "./Sort";

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

  const handleSortChange = (selectedValue) => {
    // Perform sorting logic based on the selected value
    let sortedVideoData = [...videoData];
    if (selectedValue === "desc") {
      sortedVideoData.sort((a, b) => b.rating - a.rating);
    } else if (selectedValue === "asc") {
      sortedVideoData.sort((a, b) => a.rating - b.rating);
    }
    setVideoData(sortedVideoData);
  };

  const updateRating = (videoId, newRating) => {
    // Make a PUT request to update the rating on the server
    fetch(`http://localhost:5000/${videoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: videoId, rating: newRating }),
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
      <Sort onChange={handleSortChange} />
      <VCard
        videoData={videoData}
        onDelete={deleteVideo}
        onUpdateRating={updateRating}
      />
    </div>
  );
};

export default HomePage;
