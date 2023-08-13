import React, { useEffect, useState } from "react";

import { useHttpClient } from "../hooks/http-hook";
import Clip from "./Clip";

const Container = () => {
  const [videos, setVideos] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

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
    const newVideos = videos.filter((video) => video.id !== id)
    setVideos(newVideos)
  }

  const changeRating = (id, updatedRating) => {
    const updatedVideos = videos.map(video => {
      if (video.id === id) {
        return { ...video, rating: updatedRating};
      }
      return video;
    });
    setVideos(updatedVideos)
  }

  console.log(videos.length);

  return videos && videos.map((video) => <Clip updateRating={changeRating} removeFunc={removeVideoLocally} key={video.id} {...video} />);
};

export default Container;
