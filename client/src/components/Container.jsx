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

  return videos && videos.map((video) => <Clip key={video.id} {...video} />);
};

export default Container;
