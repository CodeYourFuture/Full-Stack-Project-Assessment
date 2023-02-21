import React, { useState} from 'react'
import AddAndSearchVideo from "./AddAndSearchVideo";
import Videos from "./Videos";
// import data from '../exampleresponse.json'

const MainVideosComponent = () => {
  const [videos, setVideos] = useState([]);
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
