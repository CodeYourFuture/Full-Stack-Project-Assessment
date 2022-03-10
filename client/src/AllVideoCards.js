import React, { useState, useEffect } from "react";
import VideoOptions from "./VideoOptions";
import AllVideos from "./AllVideos";
import { get } from "express/lib/response";

function AllVideoCards() {
  const [videos, setVideos] = useState([]);
  const fetchData = async () => {
    const url = "https://humailkhan-assessment-project.herokuapp.com/videos";

    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (response.status === 200) {
        const result = await response.json();
        setVideos(result);
        window.location = "/";
      } else {
        const result = response.json();
        alert(result.msg);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
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
