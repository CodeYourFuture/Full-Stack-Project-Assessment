import React, { useState, useEffect } from "react";
import Header from "./Header";
import VCard from "./VCard";
import AddVideo from "./AddVideo";
import Sort from "./Sort";
import Footer from "./Footer";

const HomePage = () => {
  const [videoData, setVideoData] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://video-3.onrender.com/")
      .then((response) => response.json())
      .then((data) => {
        setVideoData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const updateVideoData = (newVideoData) => {
    fetch(`https://video-3.onrender.com/?order=${sortOrder}`, {
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
    fetch(`https://video-3.onrender.com/${videoId}/?order=${sortOrder}`, {
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
    let newSortOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newSortOrder);

    fetch(`https://video-3.onrender.com/?order=${newSortOrder}`)
      .then((response) => response.json())
      .then((data) => {
        setVideoData(data);
      })
      .catch((error) => console.log(error));
  };

  const updateRating = (videoId, newRating) => {
    fetch(`https://video-3.onrender.com/${videoId}`, {
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
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <VCard
          videoData={videoData}
          onDelete={deleteVideo}
          onUpdateRating={updateRating}
        />
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
