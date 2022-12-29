import React from "react";
import AppHeader from "../components/AppHeader";
import AddVideo from "../components/AddVideo"
import AllVideos from "../components/AllVideos";
import SearchVideo from "../components/SearchVideo";
import { useState, useEffect } from 'react';
import axios from 'axios'
function Home() {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    try {
      const response = await axios.get(`/api/videos`);
      const data = response.data;
      setVideos(data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getVideos();
  }, []);

  const handleDelete = async (id) => {
    console.log(id)
    try {
      const response = await axios.delete(`/api/videos/${id}`);
      console.log(response)
      console.log(`video with id ${id} deleted`)
    } catch (error) {
      console.log("Something went wrong", error)
    }
    const newData = videos.filter((result) => result.id !== id)
    setVideos(newData);

  }
  return <>
    <div className="home">
      <AppHeader />
      <SearchVideo videos={videos} setVideos={setVideos} />
      <AddVideo videos={videos} setVideos={setVideos} />
      <AllVideos videos={videos} handleDelete={handleDelete} />
    </div>
  </>
}

export default Home;