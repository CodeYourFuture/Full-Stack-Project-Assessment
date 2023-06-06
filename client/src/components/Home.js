import React, { useState, useEffect } from "react";
import SortOrder from "./SortOrder";
import Header from "./Header";
import AddVideos from "./AddVideos";
import VideoCards from "./VideoCards";
// import Footer from './components/Footer';

function Home() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState("ASC");

  useEffect(() => {
    fetch(`https://server-7g43.onrender.com/videos`)
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateVideoData = (newVideoData) => {
    fetch(`https://server-7g43.onrender.com/videos/?order=${order}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVideoData),
    })
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((err) => console.log(err));
  };

  const deleteVideo = (videoId) => {
    fetch(
      `https://server-7g43.onrender.com/videos/${videoId}/?order=${order}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const sortOrder = () => {
    let newSortOrder = order === "ASC" ? "DESC" : "ASC";
    setOrder(newSortOrder);

    fetch(`https://server-7g43.onrender.com/videos/?order=${newSortOrder}`)
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((err) => console.log(err));
  };

  const updateRating = (videoId, newRating) => {
    fetch(`https://server-7g43.onrender.com/videos/${videoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: videoId, rating: newRating }),
    })
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      <div>
        <AddVideos videoData={updateVideoData} />
        <SortOrder order={order} onToggleSort={sortOrder} />
      </div>
      {isLoading ? (
        <h1> Videos are Loading...</h1>
      ) : (
        <VideoCards
          videoData={videos}
          onDelete={deleteVideo}
          onUpdateRating={updateRating}
        />
      )}
    </div>
  );
}
export default Home;
