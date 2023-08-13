import React, { useEffect, useState } from "react";

import { useHttpClient } from "../hooks/http-hook";
import Clip from "./Clip";

const Container = () => {
  const [currentClip, setCurrentClip] = useState({ id: '', rating: '' });
  const [videos, setVideos] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

  const fetchVideos = async () => {
    try {
      const response = await sendRequest(`${process.env.REACT_APP_API_URL}/`);
      if (!isLoading) {
        setVideos(response);
      }
      console.log("Fetch request sent");
    } catch (error) {}
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const removeVideoLocally = (id) => {
    const newVideos = videos.filter((video) => video.id !== id)
    setVideos(newVideos)
  }

  const changeRating = async (id, updatedRating) => {
    try {
      const response = await sendRequest(`${process.env.REACT_APP_API_URL}/${id}`, 'PATCH', JSON.stringify({ rating: updatedRating }), {
        'Content-Type': 'application/json',
      });

      console.log(id, updatedRating);
      
    } catch (error) {
      console.log("Error updating rating", error)
    }
  }

  const changeRatingLocally = (id, updatedRating) => {
    console.log(isLoading);
    const updatedVideos = videos.map(video => {
      if (video.id === id) {
        return { ...video, rating: updatedRating };
      }
      return video;
    });
    setVideos(updatedVideos);
  }
  console.log(currentClip);
  console.log(videos);

  return videos && videos.map((video) => <Clip currentClip={currentClip} setCurrentClip={setCurrentClip} updateRating={changeRating} updateRatingLocally={changeRatingLocally} removeFunc={removeVideoLocally} key={video.id} {...video} />);
};

export default Container;
