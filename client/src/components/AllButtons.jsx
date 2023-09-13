import React, { useState, useEffect } from "react";
//import videosData from "../exampleresponse.json";
import Card from "./Card";
import Form from "./Form";

const Api = "https://junita-full-stack-project-assessment.onrender.com/";

function AllButtons() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(Api)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        const videosWithRating = data.map((video) => ({
          ...video,
          rating: video.rating || 0,
        }));
        setVideos(videosWithRating);
      })
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  const handleVote = (id, type) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id === id) {
          return {
            ...video,
            rating: type === "up" ? video.rating + 1 : video.rating - 1,
          };
        }
        return video;
      })
    );
  };

  const handleDelete = (id) => {
    fetch(`${Api}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setVideos((prevVideos) =>
          prevVideos.filter((video) => video.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting video:", error));
  };

  const handleAdd = (newVideo) => {
    fetch(Api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then((data) => {
        setVideos((prevVideos) => [
          ...prevVideos,
          { ...newVideo, id: data.id, rating: 0 },
        ]);
      })
      .catch((error) => console.error("Error adding video:", error));
  };

  return (
    <div className="App">
      <Form onAdd={handleAdd} />
      <Card videos={videos} onVote={handleVote} onDelete={handleDelete} />
    </div>
  );
}
export default AllButtons;
