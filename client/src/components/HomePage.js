import React, { useState, useEffect } from "react";
//import videos from "./exampleresponse.json";
import Header from "./Header";
import VCard from "./VCard";
import AddVideo from "./AddVideo";
import Sort from "./Sort";
import Footer from "./Footer";

const HomePage = () => {
  const [videoData, setVideoData] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

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
    fetch(`http://127.0.0.1:5000/?order=${sortOrder}`, {
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
    fetch(`http://127.0.0.1:5000/${videoId}/?order=${sortOrder}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setVideoData(data);
        console.log(data);
      })

      .catch((error) => console.log(error));
  };

  const handleToggleSortOrder = () => {
    let newSortOrder = "";
    sortOrder === "desc" ? (newSortOrder = "asc") : (newSortOrder = "desc");
    setSortOrder(newSortOrder);
    fetch(`http://localhost:5000/?order=${newSortOrder}`)
      .then((response) => response.json())
      .then((data) => {
        setVideoData(data);
      })
      .catch((error) => console.log(error));
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
    <div className="container">
      <Header />
      <div className="top-page">
        <AddVideo updateVideoData={updateVideoData} />
        <Sort sortOrder={sortOrder} onToggleSortOrder={handleToggleSortOrder} />
      </div>
      <VCard
        videoData={videoData}
        onDelete={deleteVideo}
        onUpdateRating={updateRating}
      />
      <Footer />
    </div>
  );
};

export default HomePage;
