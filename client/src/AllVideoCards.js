import React, { useState, useEffect } from "react";
import VideoOptions from "./VideoOptions";
import AllVideos from "./AllVideos";

function AllVideoCards() {
  const [videos, setVideos] = useState([]);
  const url = "https://humailkhan-assessment-project.herokuapp.com/";

  function fetchData() {
    fetch(url, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      },
    })
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
