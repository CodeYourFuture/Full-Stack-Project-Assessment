import React, { useState, useEffect } from 'react'
import AddAndSearchVideo from "./AddAndSearchVideo";
import Videos from "./Videos";
// import data from '../exampleresponse.json'

const MainVideosComponent = () => {
  const [videos, setVideos] = useState([]);
  const fetchVideosData = async () => {
    const url = "https://omer-cyf-video-recommendation.herokuapp.com";
    //https://omer-cyf-video-recommendation.herokuapp.com/
    //http://127.0.0.1:5000
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const json = await response.json();
        setVideos(json);
      } else {
        const json = response.json();
        alert(json.msg);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchVideosData();
  }, [])
  const search = (searchVal) => {
      searchVal = searchVal.toLowerCase();
      const searchedVideos = videos.filter((video) => video.title.toLowerCase().includes(searchVal));
      setVideos(searchedVideos);
  }
  return (
    <section>
      <AddAndSearchVideo videos={videos} setVideos={setVideos} search={search} />
      <Videos videos={videos} setVideos={setVideos} />
    </section>
  );
}

export default MainVideosComponent
