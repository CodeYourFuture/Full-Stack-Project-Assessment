import React, { useState, useEffect } from 'react'
import AddAndSearchVideo from "./AddAndSearchVideo";
import Videos from "./Videos";
import data from '../exampleresponse2.json'

const MainVideosComponent = () => {
  const [videos, setVideos] = useState("");
  // const url = 'https://....';
  // const getVideos = () => {
  //   fetch(url)
  //     .then((res) => {
  //       console.log(res);
  //       res.json();
  //     })
  //     .then((data) => setVideos(data))
  // }
  // useEffect(() => {
  //     getVideos();
  // }, [])
  // const search = (searchVal) => {
  //     searchVal = searchVal.toLowerCase();
  //     const searchedVideos = videos.filter((video) => video.title.toLowerCase().includes(searchVal));
  //     setVideos(searchedVideos);
  // }
  return (
    <div>
      <AddAndSearchVideo videos={data} setVideos={setVideos} />
      <Videos videos={data} />
    </div>
  );
}

export default MainVideosComponent
