import React, { useEffect, useState } from "react";

import { useHttpClient } from "../hooks/http-hook";
import Clip from "./Clip";

const Container = ({ videos, setVideos }) => {
  const [currentClip, setCurrentClip] = useState({ id: "", rating: "" });
  const { isLoading, sendRequest, error } = useHttpClient();

  const fetchVideos = async () => {
    try {
      const response = await sendRequest(`${process.env.REACT_APP_API_URL}/`);
      if (!isLoading) {
        setVideos(response);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const removeVideoLocally = (id) => {
    const newVideos = videos.filter((video) => video.id !== id);
    setVideos(newVideos);
  };

  const changeRating = async (id, updatedRating) => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_API_URL}/${id}`,
        "PATCH",
        JSON.stringify({ rating: updatedRating }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(response);
      const updatedVideos = videos.map((video) => {
        if (video.id === id) {
          return { ...video, rating: updatedRating };
        }
        return video;
      });
      setVideos(updatedVideos);
    } catch (err) {
      console.log("Error updating rating", error);
    }
  };

  return (
    <div className="container">
      {videos &&
        videos.map((video) => (
          <Clip
            currentClip={currentClip}
            setCurrentClip={setCurrentClip}
            updateRating={changeRating}
            removeFunc={removeVideoLocally}
            key={video.id}
            {...video}
          />
        ))}
      ;
    </div>
  );
};

export default Container;
