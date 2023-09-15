import React, { useEffect, useState } from "react";
import CardsContainer from "./CardsContainer";
import VideoForm from "./VideoForm";

function MainContainer() {
  const [videoData, setVideoData] = useState();
  const [fetchData, setFetchData] = useState(true);

  useEffect(() => {
    if (fetchData) {
      fetch("https://afsha-full-stack-video-storage-app.onrender.com/videos") // prod
      // fetch("http://localhost:5000/videos") // dev
        .then((response) => response.json())
        .then((data) => setVideoData(data));
    }
    setFetchData(false);
  }, [fetchData, videoData]);

  return (
    <div>
      <VideoForm
        setFetchData={setFetchData}
        videoData={videoData}
        setVideoData={setVideoData}
      />
      <CardsContainer
        setFetchData={setFetchData}
        videoData={videoData}
        setVideoData={setVideoData}
      />
    </div>
  );
}

export default MainContainer;
