import React, { useState, useEffect } from "react";
import VideoOptions from "./VideoOptions";
import AllVideos from "./AllVideos";

function AllVideoCards() {
  const [videos, setVideos] = useState([]);
  const fetchData = async () => {
    const url =
      "https://humailkhan-assessment-project.herokuapp.com/api/videos/";

    try {
      const response = await fetch(url, {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        console.log(json);
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
