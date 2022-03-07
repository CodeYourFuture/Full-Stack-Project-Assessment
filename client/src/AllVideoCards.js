import React, { useState, useEffect } from "react";
import VideoOptions from "./VideoOptions";
import AllVideos from "./AllVideos";

function AllVideoCards() {
  const [videos, setVideos] = useState([]);
  const url = "https://humailkhan-assessment-project.herokuapp.com/";

  function fetchData() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setVideos(data));
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <VideoOptions videos={videos} setVideos={setVideos} />
      <AllVideos videos={videos} setVideos={setVideos} />
    </div>
  );
}

export default AllVideoCards;
