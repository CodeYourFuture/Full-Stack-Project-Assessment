import React, { useState, useEffect } from "react";
import VideoOptions from "./VideoOptions";
import AllVideos from "./AllVideos";

function AllVideoCards() {
  const [videos, setVideos] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(`/videos`, {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        setVideos(result);
      } else {
        const result = response.json();
        alert(result.msg);
      }
    } catch (error) {
      console.log("error", error);
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
